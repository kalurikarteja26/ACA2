/**
 * ACA Enterprise Security Suite
 * Provides cryptographic hashing, constant-time verification, XSS sanitization,
 * password complexity validation, and CSRF token generation.
 */

/**
 * Hash a plain password using SHA-256 with an individual cryptographic salt.
 * Built with standard Web Crypto API (supported natively across modern browsers).
 *
 * @param {string} password
 * @param {string} salt
 * @returns {Promise<string>} Hex-encoded hash
 */
export async function hashPassword(password, salt = 'aca_sec_2026_salt') {
  if (!password) return '';
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '::' + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Constant-time comparison between two hashes to prevent side-channel timing attacks.
 */
export function safeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const charA = i < a.length ? a.charCodeAt(i) : 0;
    const charB = i < b.length ? b.charCodeAt(i) : 0;
    diff |= charA ^ charB;
  }
  return diff === 0;
}

/**
 * Enforces enterprise password complexity standards:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 numeric digit
 * - At least 1 special character (@$!%*?&#^_-)
 */
export function validatePasswordStrength(password) {
  if (!password || typeof password !== 'string') {
    return { valid: false, score: 0, feedback: 'Password is required' };
  }

  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  let score = 0;
  if (minLength) score += 20;
  if (hasUpper) score += 20;
  if (hasLower) score += 20;
  if (hasNumber) score += 20;
  if (hasSpecial) score += 20;

  const errors = [];
  if (!minLength) errors.push('At least 8 characters');
  if (!hasUpper) errors.push('At least 1 uppercase letter');
  if (!hasLower) errors.push('At least 1 lowercase letter');
  if (!hasNumber) errors.push('At least 1 digit');
  if (!hasSpecial) errors.push('At least 1 special character');

  return {
    valid: errors.length === 0,
    score,
    feedback: errors.length === 0 ? 'Strong password' : `Requires: ${errors.join(', ')}`
  };
}

/**
 * Robust Cross-Site Scripting (XSS) Input Sanitizer
 * Removes dangerous script tags, inline javascript protocols, event handlers,
 * and encodes raw HTML entities.
 *
 * @param {string} input - raw untrusted user input
 * @returns {string} sanitized safe string
 */
export function sanitizeInput(input) {
  if (input === null || input === undefined) return '';
  if (typeof input !== 'string') input = String(input);

  // 1. Strip null bytes
  let clean = input.replace(/\0/g, '');

  // 2. Strip explicit script blocks, style blocks, and iframe / embed tags
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  clean = clean.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  // 3. Strip inline event handlers (e.g. onerror=, onload=, onclick=)
  clean = clean.replace(/on\w+\s*=\s*(?:["'][^"']*["']|[^\s>]+)/gi, '');

  // 4. Strip javascript: and vbscript: URIs
  clean = clean.replace(/(?:javascript|vbscript|data):/gi, '');

  // 5. HTML Entity Encode
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;'
  };
  clean = clean.replace(/[&<>"'`/]/g, char => entityMap[char] || char);

  return clean.trim();
}

/**
 * Deep sanitizes all string properties of an object or array recursively
 */
export function sanitizeObject(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') return sanitizeInput(obj);
  if (Array.isArray(obj)) return obj.map(sanitizeObject);
  if (typeof obj === 'object') {
    const sanitized = {};
    for (const key of Object.keys(obj)) {
      sanitized[key] = sanitizeObject(obj[key]);
    }
    return sanitized;
  }
  return obj;
}

/**
 * Validate RFC 5322 Email
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return re.test(email.trim());
}

/**
 * Cryptographically secure CSRF token generator
 */
export function generateCSRFToken() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Masks tax identifiers or account numbers for display (e.g. ***-**-1234)
 */
export function maskSensitive(str, visibleEndChars = 4) {
  if (!str) return '••••';
  const clean = String(str).trim();
  if (clean.length <= visibleEndChars) return '••••';
  return '•'.repeat(clean.length - visibleEndChars) + clean.slice(-visibleEndChars);
}
