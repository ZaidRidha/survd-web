import { NextRequest } from 'next/server';

/**
 * Extract client IP address from Next.js request
 * Handles various proxy headers (Vercel, Cloudflare, etc.)
 */
export function getClientIp(request: NextRequest): string {
  // Try Vercel's forwarded IP header first
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwardedFor.split(',')[0].trim();
  }

  // Try real IP header (used by some proxies)
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // Try Cloudflare's connecting IP
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  // Fallback to 'unknown' if no IP found
  // This shouldn't happen on Vercel, but provides a safe fallback
  return 'unknown';
}
