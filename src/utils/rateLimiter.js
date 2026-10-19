/**
 * ACA Client-Side & API Action Rate Limiter
 * Guards against brute-force authentication, API resource exhaustion,
 * and automated bot scraping.
 */

class RateLimiter {
  constructor({ maxRequests = 10, windowMs = 60000, lockoutMs = 120000, name = 'default' }) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.lockoutMs = lockoutMs;
    this.name = name;
    this.records = new Map();
  }

  /**
   * Attempt an action for a given identifier (e.g. user IP, email, or session code)
   * @param {string} id
   * @returns {{ allowed: boolean, remaining: number, retryAfterSeconds: number }}
   */
  attempt(id = 'global') {
    const now = Date.now();
    let record = this.records.get(id);

    if (!record) {
      record = { timestamps: [], lockedUntil: 0 };
      this.records.set(id, record);
    }

    // 1. Check if currently locked out
    if (record.lockedUntil > now) {
      const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000);
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds,
        message: `Too many attempts on ${this.name}. Locked out for ${retryAfterSeconds}s.`
      };
    }

    // 2. Clean timestamps older than the sliding window
    record.timestamps = record.timestamps.filter(ts => now - ts < this.windowMs);

    // 3. Check if window limit exceeded
    if (record.timestamps.length >= this.maxRequests) {
      record.lockedUntil = now + this.lockoutMs;
      const retryAfterSeconds = Math.ceil(this.lockoutMs / 1000);
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds,
        message: `Rate limit exceeded on ${this.name}. Locked out for ${retryAfterSeconds}s.`
      };
    }

    // 4. Record current request
    record.timestamps.push(now);
    const remaining = this.maxRequests - record.timestamps.length;

    return {
      allowed: true,
      remaining,
      retryAfterSeconds: 0,
      message: null
    };
  }

  /**
   * Reset rate limit state for an identifier (e.g. upon successful login)
   */
  reset(id = 'global') {
    this.records.delete(id);
  }

  /**
   * Peek at current rate limit status without recording an attempt
   */
  peek(id = 'global') {
    const now = Date.now();
    const record = this.records.get(id);
    if (!record) return { allowed: true, remaining: this.maxRequests, retryAfterSeconds: 0 };

    if (record.lockedUntil > now) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.ceil((record.lockedUntil - now) / 1000)
      };
    }

    const validTimestamps = record.timestamps.filter(ts => now - ts < this.windowMs);
    return {
      allowed: validTimestamps.length < this.maxRequests,
      remaining: Math.max(0, this.maxRequests - validTimestamps.length),
      retryAfterSeconds: 0
    };
  }
}

// ── Specialized Rate Limiters ──

// 1. Authentication Limiter (Max 5 attempts / min, 120s lockout)
export const authLimiter = new RateLimiter({
  name: 'Authentication Gateway',
  maxRequests: 5,
  windowMs: 60000,
  lockoutMs: 120000
});

// 2. AI Tax Assistant Limiter (Max 15 prompts / min to prevent spam)
export const aiAssistantLimiter = new RateLimiter({
  name: 'Tax AI Assistant',
  maxRequests: 15,
  windowMs: 60000,
  lockoutMs: 60000
});

// 3. Tax Filing Submission Limiter (Max 3 submissions / min)
export const taxFilingLimiter = new RateLimiter({
  name: 'Government Filing Gateway',
  maxRequests: 3,
  windowMs: 60000,
  lockoutMs: 180000
});

// 4. Global Search Limiter (Max 35 search queries / min)
export const searchLimiter = new RateLimiter({
  name: 'Tax Topic Search',
  maxRequests: 35,
  windowMs: 60000,
  lockoutMs: 30000
});
