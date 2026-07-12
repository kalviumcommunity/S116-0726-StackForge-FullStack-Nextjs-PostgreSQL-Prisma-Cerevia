/**
 * Safely sanitizes error messages and details to prevent logging passwords, JWTs, and keys.
 */
export function sanitizeLogData(data: unknown): unknown {
  if (typeof data === 'string') {
    let sanitized = data;
    // Mask passwords, tokens, and credentials in string patterns
    sanitized = sanitized.replace(
      /(password|pass|secret|token|key|credential|authorization|cookie)["\s:]+["']([^"']+)["']/gi,
      '$1": "[REDACTED]"',
    );
    sanitized = sanitized.replace(
      /Bearer\s+[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/gi,
      'Bearer [REDACTED]',
    );
    sanitized = sanitized.replace(
      /eyJ[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/gi,
      '[REDACTED_JWT]',
    );
    return sanitized;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeLogData(item));
  }

  if (data !== null && typeof data === 'object') {
    const sanitizedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();
      if (
        lowerKey.includes('password') ||
        lowerKey.includes('secret') ||
        lowerKey.includes('token') ||
        lowerKey.includes('jwt') ||
        lowerKey.includes('auth') ||
        lowerKey.includes('credential') ||
        lowerKey.includes('key') ||
        lowerKey.includes('cookie')
      ) {
        sanitizedObj[key] = '[REDACTED]';
      } else if (value instanceof Error) {
        sanitizedObj[key] = {
          name: value.name,
          message: sanitizeLogData(value.message),
          stack: value.stack ? sanitizeLogData(value.stack) : undefined,
        };
      } else {
        sanitizedObj[key] = sanitizeLogData(value);
      }
    }
    return sanitizedObj;
  }

  return data;
}

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    console.log(
      `[INFO] ${sanitizeLogData(message)}`,
      ...args.map(sanitizeLogData),
    );
  },
  error: (message: string, error?: unknown, ...args: unknown[]) => {
    const errorDetails = error ? sanitizeLogData(error) : '';
    console.error(
      `[ERROR] ${sanitizeLogData(message)}`,
      errorDetails,
      ...args.map(sanitizeLogData),
    );
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(
      `[WARN] ${sanitizeLogData(message)}`,
      ...args.map(sanitizeLogData),
    );
  },
};
