import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { getClientIp } from '@/lib/utils/get-client-ip';

/**
 * TESTING ONLY - Reset rate limit for current IP
 * DELETE THIS FILE BEFORE PRODUCTION!
 */

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 403 }
    );
  }

  try {
    const ip = getClientIp(request);
    const key = `ratelimit:waitlist:${ip}`;

    await redis.del(key);

    return NextResponse.json({
      success: true,
      message: `Rate limit reset for IP: ${ip}`,
    });
  } catch (error) {
    console.error('Error resetting rate limit:', error);
    return NextResponse.json(
      { error: 'Failed to reset rate limit' },
      { status: 500 }
    );
  }
}
