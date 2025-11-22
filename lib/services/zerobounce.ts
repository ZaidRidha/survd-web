// ZeroBounce SDK uses CommonJS - need to import differently
const ZeroBounceSDK = require('@zerobounce/zero-bounce-sdk');

// Create ZeroBounce instance
let zeroBounce: any = null;

// Get API key
const apiKey = process.env.ZEROBOUNCE_API_KEY || '';

// Initialize ZeroBounce instance (lazy initialization)
function getZeroBounceInstance() {
  if (!zeroBounce && apiKey) {
    try {
      zeroBounce = new ZeroBounceSDK();
      zeroBounce.init(apiKey);
    } catch (error) {
      console.error('Failed to initialize ZeroBounce SDK:', error);
      return null;
    }
  }
  return zeroBounce;
}

export interface EmailValidationResult {
  valid: boolean;
  status: string;
  subStatus: string;
  message: string;
  isDisposable: boolean;
  isFreeEmail: boolean;
}

/**
 * Validate an email address using ZeroBounce API
 * @param email - The email address to validate
 * @returns EmailValidationResult with validation details
 */
export async function validateEmail(
  email: string
): Promise<EmailValidationResult> {
  // If no API key is configured, allow signup with basic validation only
  if (!apiKey) {
    console.warn('ZeroBounce API key not configured, allowing signup with basic validation only');
    return {
      valid: true,
      status: 'skipped',
      subStatus: 'no_api_key',
      message: 'Email validation skipped - no API key configured',
      isDisposable: false,
      isFreeEmail: false,
    };
  }

  // Get ZeroBounce instance (lazy initialization)
  const zbInstance = getZeroBounceInstance();

  // If initialization failed, allow signup with basic validation
  if (!zbInstance) {
    console.warn('ZeroBounce initialization failed, allowing signup with basic validation only');
    return {
      valid: true,
      status: 'init_failed',
      subStatus: 'initialization_error',
      message: 'Email validation unavailable - initialization failed',
      isDisposable: false,
      isFreeEmail: false,
    };
  }

  try {
    const response = await zbInstance.validateEmail(email);

    // ZeroBounce status values:
    // - valid: Email is valid and safe to send to
    // - invalid: Email is invalid
    // - catch-all: Email server accepts all emails (risky)
    // - unknown: Cannot determine status
    // - spamtrap: Email is a spam trap
    // - abuse: Email is known for abuse
    // - do_not_mail: Email should not be mailed

    const isValid =
      response.status === 'valid' ||
      response.status === 'catch-all'; // You can decide whether to accept catch-all

    const result: EmailValidationResult = {
      valid: isValid,
      status: response.status,
      subStatus: response.sub_status || '',
      message: getValidationMessage(response.status),
      isDisposable: response.free_email === true,
      isFreeEmail: response.free_email === true,
    };

    console.log(`ZeroBounce validation for ${email}:`, result.status);
    return result;
  } catch (error: any) {
    console.error('ZeroBounce validation error (allowing signup to continue):', error);

    // Fail-open: Allow the email through if ZeroBounce is unavailable
    // This ensures legitimate users can still sign up when:
    // - Out of credits
    // - API rate limited
    // - Service temporarily down
    // Note: Basic validation (regex + disposable check) still applies
    return {
      valid: true,
      status: 'error_fallback',
      subStatus: 'api_error',
      message: 'Email validation unavailable, proceeding with basic validation',
      isDisposable: false,
      isFreeEmail: false,
    };
  }
}

/**
 * Get a user-friendly message based on validation status
 */
function getValidationMessage(status: string): string {
  switch (status) {
    case 'valid':
      return 'Email is valid';
    case 'invalid':
      return 'Email address is invalid or does not exist';
    case 'catch-all':
      return 'Email domain accepts all addresses';
    case 'spamtrap':
      return 'Email is a known spam trap';
    case 'abuse':
      return 'Email is associated with abuse complaints';
    case 'do_not_mail':
      return 'Email should not be used for mailing';
    case 'unknown':
      return 'Unable to verify email address';
    default:
      return 'Email verification failed';
  }
}

/**
 * Check if email is from a disposable/temporary email provider
 * This is a lightweight check before calling the full API
 */
export function isDisposableEmail(email: string): boolean {
  const disposableDomains = [
    'tempmail.com',
    'guerrillamail.com',
    'mailinator.com',
    '10minutemail.com',
    'throwaway.email',
    'temp-mail.org',
    'fakeinbox.com',
    'trashmail.com',
    'maildrop.cc',
    'getnada.com',
  ];

  const domain = email.split('@')[1]?.toLowerCase();
  return disposableDomains.includes(domain);
}
