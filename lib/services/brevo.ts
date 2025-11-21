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

    sendSmtpEmail.subject = "You're on the Survd waitlist";
    sendSmtpEmail.to = [{ email: entry.email, name: entry.name }];
    sendSmtpEmail.sender = {
      name: 'Survd',
      email: process.env.BREVO_SENDER_EMAIL || 'contact@survd.co.uk',
    };


    // Simplified HTML email template - more transactional, less promotional
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="margin-bottom: 32px;">
            <img src="https://survd.co.uk/images/logos/survd-logo.png" alt="Survd" style="max-width: 140px; height: auto;" />
          </div>

          <h2 style="font-size: 24px; color: #000000; font-weight: 600; margin: 0 0 16px 0;">Hi ${entry.name},</h2>

          <p style="font-size: 16px; color: #333333; margin: 0 0 16px 0; line-height: 1.5;">
            You've successfully joined the Survd waitlist as a <strong>${entry.userType}</strong>.
          </p>

          <p style="font-size: 16px; color: #333333; margin: 0 0 16px 0; line-height: 1.5;">
            We'll notify you by email when we launch. As an early member, you'll get access to the platform before our public release.
          </p>

          <p style="font-size: 16px; color: #333333; margin: 0 0 16px 0; line-height: 1.5;">
            ${entry.userType === 'customer'
              ? 'You\'ll be able to book appointments, get services at your location, and access verified professionals.'
              : 'You\'ll be able to reach new customers, manage your schedule, and grow your business on our platform.'
            }
          </p>

          <p style="font-size: 16px; color: #333333; margin: 0 0 24px 0; line-height: 1.5;">
            Thank you for your interest in Survd.
          </p>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="font-size: 14px; color: #666666; margin: 0; line-height: 1.5;">
              Questions? Reply to this email.<br>
              Visit <a href="https://survd.co.uk" style="color: #666666; text-decoration: none;">survd.co.uk</a>
            </p>
          </div>
        </body>
      </html>
    `;

    // Plain text fallback
    sendSmtpEmail.textContent = `
Hi ${entry.name},

You've successfully joined the Survd waitlist as a ${entry.userType.toUpperCase()}.

We'll notify you by email when we launch. As an early member, you'll get access to the platform before our public release.

${entry.userType === 'customer'
  ? "You'll be able to book appointments, get services at your location, and access verified professionals."
  : "You'll be able to reach new customers, manage your schedule, and grow your business on our platform."
}

Thank you for your interest in Survd.

Questions? Reply to this email.
Visit survd.co.uk
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
