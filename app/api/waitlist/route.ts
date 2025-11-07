import { NextRequest, NextResponse } from 'next/server';

// In a real app, you would save this to a database
// For now, we'll just log it and return success
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

    // TODO: Save to database
    // Example: await db.waitlist.create({ name, email, userType, createdAt: new Date() })

    // For now, just log it
    console.log('New waitlist signup:', {
      name,
      email,
      userType,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send confirmation email
    // Example: await sendEmail({ to: email, template: 'waitlist-confirmation' })

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully joined the waitlist',
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
