import * as brevo from '@getbrevo/brevo';
import { WaitlistEntry } from '../types/waitlist';

// Initialize Brevo API client
const apiInstance = new brevo.ContactsApi();
const emailApiInstance = new brevo.TransactionalEmailsApi();

// Set API key from environment variable
apiInstance.setApiKey(
  brevo.ContactsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY || ''
);
emailApiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY || ''
);

/**
 * Add a contact to Brevo waitlist
 * Creates or updates a contact with waitlist information
 */
export async function addToBrevoWaitlist(entry: WaitlistEntry): Promise<void> {
  try {
    const createContact = new brevo.CreateContact();
    createContact.email = entry.email;
    createContact.attributes = {
      FIRSTNAME: entry.name.split(' ')[0], // First word as first name
      LASTNAME: entry.name.split(' ').slice(1).join(' ') || '', // Rest as last name
      USER_TYPE: entry.userType,
      WAITLIST_JOINED: new Date().toISOString(),
    };

    // Add to waitlist list
    createContact.listIds = [parseInt(process.env.BREVO_WAITLIST_ID || '0')];
    createContact.updateEnabled = true; // Update if contact already exists

    await apiInstance.createContact(createContact);
    console.log(`✓ Contact added to Brevo: ${entry.email}`);
  } catch (error: any) {
    // If contact already exists, update it
    if (error.response?.status === 400 && error.response?.text?.includes('Contact already exist')) {
      console.log(`Contact already exists, updating: ${entry.email}`);
      // Contact exists, which is fine - they're already on the waitlist
      return;
    }
    console.error('Error adding contact to Brevo:', error);
    throw new Error('Failed to add contact to waitlist');
  }
}

/**
 * Send a confirmation email to a waitlist member
 */
export async function sendWaitlistConfirmationEmail(
  entry: WaitlistEntry
): Promise<void> {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = 'Survd Waitlist Confirmation';
    sendSmtpEmail.to = [{ email: entry.email, name: entry.name }];
    sendSmtpEmail.sender = {
      name: 'Survd',
      email: process.env.BREVO_SENDER_EMAIL || 'contact@survd.co.uk',
    };

    // HTML email template
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Survd Waitlist Confirmation</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #000000; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff;">
          <div style="text-align: left; margin-bottom: 32px;">
            <img src="https://survd.co.uk/images/logos/survd-logo.png" alt="Survd Logo" style="max-width: 160px; height: auto;" />
          </div>

          <div style="background: #ffffff; padding: 0;">
            <h2 style="font-size: 24px; color: #000000; font-weight: 600; margin: 0 0 16px 0;">Hello ${entry.name},</h2>

            <p style="font-size: 16px; color: #000000; margin: 0 0 20px 0; line-height: 1.5;">Thank you for signing up as a <strong>${entry.userType}</strong>.</p>

            ${entry.userType === 'customer' ? `
              <p style="font-size: 16px; color: #000000; margin: 20px 0 12px 0; line-height: 1.5;"><strong>Your waitlist registration includes:</strong></p>
              <ul style="font-size: 15px; line-height: 1.6; color: #000000; margin: 0 0 20px 0; padding-left: 20px;">
                <li style="margin-bottom: 4px;">Earlier access to vendors</li>
                <li style="margin-bottom: 4px;">Discounts on initial bookings</li>
              </ul>
            ` : `
              <p style="font-size: 16px; color: #000000; margin: 20px 0 12px 0; line-height: 1.5;"><strong>Your waitlist registration includes:</strong></p>
              <ul style="font-size: 15px; line-height: 1.6; color: #000000; margin: 0 0 20px 0; padding-left: 20px;">
                <li style="margin-bottom: 4px;">Lower commission rates</li>
                <li style="margin-bottom: 4px;">Increased discoverability on the platform</li>
                <li style="margin-bottom: 4px;">Featured vendor placement</li>
              </ul>
            `}

            <p style="font-size: 16px; color: #000000; margin: 20px 0 16px 0; line-height: 1.5;">You will receive an email notification when the platform becomes available.</p>

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
              <p style="font-size: 14px; color: #666666; margin: 0; line-height: 1.5;">
                If you have any questions, please reply to this email.<br>
                <span style="color: #999999; font-size: 13px;">Visit us at <a href="https://survd.co.uk" style="color: #999999; text-decoration: underline;">www.survd.co.uk</a></span>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text fallback
    sendSmtpEmail.textContent = `
Hello ${entry.name},

Thank you for signing up as a ${entry.userType}.

Your waitlist registration includes:
${entry.userType === 'customer'
  ? '- Earlier access to vendors\n- Discounts on initial bookings'
  : '- Lower commission rates\n- Increased discoverability on the platform\n- Featured vendor placement'
}

You will receive an email notification when the platform becomes available.

If you have any questions, please reply to this email.

Visit us at www.survd.co.uk
    `.trim();

    await emailApiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`✓ Confirmation email sent to: ${entry.email}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw error - we don't want email failure to prevent signup
    // The contact is still added to the list
  }
}

/**
 * Combined function to add contact and send confirmation email
 */
export async function handleWaitlistSignup(
  entry: WaitlistEntry
): Promise<{ success: boolean; message: string }> {
  try {
    // Add contact to Brevo
    await addToBrevoWaitlist(entry);

    // Send confirmation email
    await sendWaitlistConfirmationEmail(entry);

    return {
      success: true,
      message: 'Successfully added to waitlist!',
    };
  } catch (error: any) {
    console.error('Error handling waitlist signup:', error);
    return {
      success: false,
      message: error.message || 'Failed to process waitlist signup',
    };
  }
}
