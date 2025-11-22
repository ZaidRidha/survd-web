import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Redis client for Upstash (lazy initialization)
 * Uses environment variables for configuration
 */
let redis: Redis | null = null;
let waitlistRateLimiterInstance: Ratelimit | null = null;
let generalRateLimiterInstance: Ratelimit | null = null;

/**
 * Get or create Redis instance (lazy initialization with error handling)
 */
function getRedisInstance(): Redis | null {
  if (redis) return redis;

  const url = process.env.UPSTASH_REDIS_REST_URL || '';
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || '';

  if (!url || !token) {
    console.warn('Upstash Redis credentials not configured');
    return null;
  }

  try {
    redis = new Redis({ url, token });
    return redis;
  } catch (error) {
    console.error('Failed to initialize Upstash Redis:', error);
    return null;
  }
}

/**
 * Rate limiter for waitlist signups
 * Allows 5 requests per hour per IP address
 */
export const waitlistRateLimiter = {
  limit: async (identifier: string) => {
    const redisClient = getRedisInstance();

    // If Redis is unavailable, return success (fail-open)
    if (!redisClient) {
      console.warn('Rate limiting unavailable (Redis not initialized), allowing request');
      return {
        success: true,
        limit: 5,
        remaining: 5,
        reset: Date.now() + 3600000, // 1 hour from now
      };
    }

    // Lazy initialize rate limiter
    if (!waitlistRateLimiterInstance) {
      waitlistRateLimiterInstance = new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(5, '1 h'),
        analytics: true,
        prefix: 'ratelimit:waitlist',
      });
    }

    return await waitlistRateLimiterInstance.limit(identifier);
  },
};

/**
 * General API rate limiter (optional - for other endpoints)
 * Allows 100 requests per 15 minutes
 */
export const generalRateLimiter = {
  limit: async (identifier: string) => {
    const redisClient = getRedisInstance();

    // If Redis is unavailable, return success (fail-open)
    if (!redisClient) {
      console.warn('Rate limiting unavailable (Redis not initialized), allowing request');
      return {
        success: true,
        limit: 100,
        remaining: 100,
        reset: Date.now() + 900000, // 15 minutes from now
      };
    }

    // Lazy initialize rate limiter
    if (!generalRateLimiterInstance) {
      generalRateLimiterInstance = new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(100, '15 m'),
        analytics: true,
        prefix: 'ratelimit:api',
      });
    }

    return await generalRateLimiterInstance.limit(identifier);
  },
};
