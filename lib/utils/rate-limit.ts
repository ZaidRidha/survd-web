import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Redis client for Upstash
 * Uses environment variables for configuration
 */
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

/**
 * Rate limiter for waitlist signups
 * Allows 5 requests per hour per IP address
 */
export const waitlistRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
  prefix: 'ratelimit:waitlist',
});

/**
 * General API rate limiter (optional - for other endpoints)
 * Allows 100 requests per 15 minutes
 */
export const generalRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '15 m'),
  analytics: true,
  prefix: 'ratelimit:api',
});
