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

    sendSmtpEmail.subject = 'Welcome to Survd Waitlist!';
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
          <title>Welcome to Survd!</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #000000; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff;">
          <div style="text-align: left; margin-bottom: 32px;">
            <img src="https://survd.co.uk/images/logos/survd-logo.png" alt="Survd Logo" style="max-width: 160px; height: auto;" />
          </div>

          <div style="background: #ffffff; padding: 0;">
            <h2 style="font-size: 26px; color: #000000; font-weight: 700; margin: 0 0 16px 0; letter-spacing: -0.5px;">Hi ${entry.name}!</h2>

            <p style="font-size: 17px; color: #000000; margin: 0 0 20px 0; line-height: 1.5;">Thank you for joining the Survd waitlist as a <strong>${entry.userType}</strong>!</p>

            ${entry.userType === 'customer' ? `
              <p style="font-size: 16px; color: #000000; margin: 0 0 12px 0;">You're one step closer to accessing on-demand mobile services at your fingertips. Soon you'll be able to:</p>
              <ul style="font-size: 16px; line-height: 1.7; color: #000000; margin: 0 0 24px 0; padding-left: 20px;">
                <li style="margin-bottom: 6px;">Book appointments in seconds</li>
                <li style="margin-bottom: 6px;">Get services at your location</li>
                <li style="margin-bottom: 6px;">Access verified professionals 24/7</li>
                <li style="margin-bottom: 6px;">Track your appointments in real-time</li>
              </ul>
            ` : `
              <p style="font-size: 16px; color: #000000; margin: 0 0 12px 0;">You're one step closer to growing your business with Survd. Soon you'll be able to:</p>
              <ul style="font-size: 16px; line-height: 1.7; color: #000000; margin: 0 0 24px 0; padding-left: 20px;">
                <li style="margin-bottom: 6px;">Reach more customers</li>
                <li style="margin-bottom: 6px;">Manage your schedule efficiently</li>
                <li style="margin-bottom: 6px;">Build your professional brand</li>
                <li style="margin-bottom: 6px;">Earn more with flexible hours</li>
              </ul>
            `}

            <div style="background: #f5f5f5; border-radius: 6px; padding: 18px; margin: 24px 0;">
              <p style="font-size: 16px; margin: 0; color: #000000; line-height: 1.5;">
                <strong style="font-weight: 700;">What's next?</strong><br>
                We'll keep you updated on our launch and send you exclusive early access when we're ready!
              </p>
            </div>

            <div style="margin-top: 28px; margin-bottom: 28px;">
              <a href="https://survd.co.uk" style="display: inline-block; background: #000000; color: #ffffff; padding: 15px 36px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Visit Survd</a>
            </div>

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
              <p style="font-size: 14px; color: #666666; margin: 0; line-height: 1.5;">
                Questions? Reply to this email or visit our website.<br>
                <span style="color: #999999; font-size: 13px;">Survd - Mobile Services On Demand</span>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text fallback
    sendSmtpEmail.textContent = `
Hi ${entry.name}!

Thank you for joining the Survd waitlist as a ${entry.userType}!

We'll keep you updated on our launch and send you exclusive early access when we're ready!

Visit us at: https://survd.co.uk

Questions? Reply to this email or visit our website.

Survd - Mobile Services On Demand
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
