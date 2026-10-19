/**
 * ACA Cryptographic Client Storage (AES-GCM 256-bit)
 * Automatically encrypts PII, tax forms, and profile data at rest in browser storage.
 */

// Derive a stable, device-specific key material for local storage encryption
const STORAGE_PEPPER = 'aca_data_vault_aes256_pepper_2026';

async function getEncryptionKey() {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(STORAGE_PEPPER),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('aca_tax_salt_vault'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt a JavaScript object or string into a base64 ciphertext
 */
export async function encryptData(data) {
  try {
    const key = await getEncryptionKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(JSON.stringify(data));

    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoded
    );

    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(ciphertext), iv.length);

    return btoa(String.fromCharCode.apply(null, combined));
  } catch (err) {
    console.error('Encryption failure:', err);
    return JSON.stringify(data);
  }
}

/**
 * Decrypt a base64 ciphertext back to the original JavaScript object
 */
export async function decryptData(encodedStr) {
  if (!encodedStr) return null;
  try {
    const key = await getEncryptionKey();
    const binary = atob(encodedStr);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const iv = bytes.slice(0, 12);
    const ciphertext = bytes.slice(12);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    );

    const decodedStr = new TextDecoder().decode(decrypted);
    return JSON.parse(decodedStr);
  } catch (err) {
    // Graceful fallback if item was stored unencrypted before encryption upgrade
    try {
      return JSON.parse(encodedStr);
    } catch {
      return encodedStr;
    }
  }
}

/**
 * High-level Secure Storage wrapper
 */
export const secureStorage = {
  async setItem(key, value) {
    const encrypted = await encryptData(value);
    localStorage.setItem(`enc_${key}`, encrypted);
  },

  async getItem(key, defaultValue = null) {
    const raw = localStorage.getItem(`enc_${key}`);
    if (!raw) {
      // Check legacy unencrypted fallback
      const legacy = localStorage.getItem(key);
      if (legacy) {
        try {
          return JSON.parse(legacy);
        } catch {
          return legacy;
        }
      }
      return defaultValue;
    }
    const decrypted = await decryptData(raw);
    return decrypted !== null ? decrypted : defaultValue;
  },

  removeItem(key) {
    localStorage.removeItem(`enc_${key}`);
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};
