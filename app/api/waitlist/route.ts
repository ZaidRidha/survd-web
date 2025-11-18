import { NextRequest, NextResponse } from 'next/server';
import { handleWaitlistSignup } from '@/lib/services/brevo';
import { WaitlistEntry } from '@/lib/types/waitlist';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, userType } = body;

    // Validation
    if (!name || !email || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (userType !== 'customer' && userType !== 'vendor') {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      );
    }

    // Create waitlist entry
    const entry: WaitlistEntry = {
      name,
      email,
      userType,
      createdAt: new Date(),
    };

    // Add to Brevo and send confirmation email
    const result = await handleWaitlistSignup(entry);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      );
    }

    console.log('✓ Waitlist signup complete:', email);

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully joined the waitlist! Check your email for confirmation.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve waitlist (for admin)
export async function GET() {
  // TODO: Add authentication check here
  // TODO: Fetch from database

  return NextResponse.json(
    { message: 'Waitlist endpoint - implement database fetch' },
    { status: 200 }
  );
}
