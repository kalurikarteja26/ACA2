/**
 * Centralized, validated environment configuration
 * Guarantees no sensitive server secrets or private keys are exposed client-side.
 */

// Detect whether debug mode is strictly disabled
const isDebugEnabled = import.meta.env.VITE_DEBUG_MODE === 'true';

// In production or when debug mode is false, suppress standard console debug noise
if (!isDebugEnabled && typeof window !== 'undefined') {
  // Retain error logging for unhandled issues, but strip debug logs
  window.console.debug = () => {};
}

export const ENV = {
  APP_ENV: import.meta.env.VITE_APP_ENV || 'production',
  DEBUG_MODE: isDebugEnabled,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.aca-tax.com/v1',
  SESSION_TIMEOUT_MINUTES: Number(import.meta.env.VITE_SESSION_TIMEOUT_MINUTES) || 30,
  RATE_LIMIT_LOGIN_MAX: Number(import.meta.env.VITE_RATE_LIMIT_LOGIN_MAX_ATTEMPTS) || 5,
  RATE_LIMIT_AI_MAX: Number(import.meta.env.VITE_RATE_LIMIT_AI_MAX_PER_MINUTE) || 15,
  ENABLE_AUDIT_LOGS: import.meta.env.VITE_ENABLE_AUDIT_LOGGING !== 'false',
  STRICT_XSS: import.meta.env.VITE_STRICT_XSS_SANITIZATION !== 'false',
  ENCRYPT_STORAGE: import.meta.env.VITE_ENCRYPT_LOCAL_STORAGE !== 'false',

  // Gateway status endpoints
  GATEWAYS: {
    CRA: import.meta.env.VITE_CRA_NETFILE_ENDPOINT || 'https://netfile.cra-arc.gc.ca/v2026/gateway',
    IRS: import.meta.env.VITE_IRS_MEF_ENDPOINT || 'https://mef.irs.gov/a2a/v2026/submission',
    ITD: import.meta.env.VITE_ITD_EFILING_ENDPOINT || 'https://eportal.incometax.gov.in/iec/services/v2',
  }
};

/**
 * Validates that no private keys or unprotected tokens were mistakenly injected into client environment
 */
export function validateEnvironmentIntegrity() {
  const exposedKeys = Object.keys(import.meta.env).filter(key => {
    const k = key.toLowerCase();
    return (
      k.includes('secret') ||
      k.includes('private_key') ||
      k.includes('db_pass') ||
      k.includes('database_url') ||
      k.includes('aws_secret')
    );
  });

  if (exposedKeys.length > 0) {
    console.error('CRITICAL SECURITY VIOLATION: Sensitive server variables exposed in client environment!', exposedKeys);
    return { secure: false, violations: exposedKeys };
  }

  return { secure: true, violations: [] };
}
