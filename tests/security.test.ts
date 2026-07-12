import { NextResponse } from 'next/server';
import {
  getHelmetHeaders,
  applyHelmet,
  applyCors,
  sanitizeData,
  checkRateLimit,
  getClientIp,
} from '../src/lib/security';
import { sanitizeLogData } from '../src/lib/logger';

async function runSecurityTests() {
  console.log('🧪 Starting Production Security Hardening Integration Tests...');

  try {
    // ----------------------------------------------------
    // Test 1: Helmet Security Headers
    // ----------------------------------------------------
    console.log('- Testing Helmet Security Headers...');
    const helmetHeaders = getHelmetHeaders();
    if (!helmetHeaders['content-security-policy']) {
      throw new Error('Missing Content-Security-Policy header in Helmet config');
    }
    if (helmetHeaders['x-frame-options'] !== 'SAMEORIGIN') {
      throw new Error(`Expected X-Frame-Options to be SAMEORIGIN, got ${helmetHeaders['x-frame-options']}`);
    }
    if (helmetHeaders['referrer-policy'] !== 'no-referrer') {
      throw new Error(`Expected Referrer-Policy to be no-referrer, got ${helmetHeaders['referrer-policy']}`);
    }
    if (helmetHeaders['x-content-type-options'] !== 'nosniff') {
      throw new Error(`Expected X-Content-Type-Options to be nosniff, got ${helmetHeaders['x-content-type-options']}`);
    }

    const testRes = new NextResponse(null);
    testRes.headers.set('X-Powered-By', 'Next.js');
    applyHelmet(testRes);
    if (testRes.headers.get('x-powered-by')) {
      throw new Error('X-Powered-By header was not removed by Helmet wrapper');
    }
    console.log('✅ Helmet Security Headers validated.');

    // ----------------------------------------------------
    // Test 2: CORS Configuration
    // ----------------------------------------------------
    console.log('- Testing CORS policy matching...');
    process.env.ALLOWED_ORIGINS = 'https://cerevia.com,https://dashboard.cerevia.com';

    // Matches trusted origin
    const corsRequest = new Request('http://localhost:3000/api/streak', {
      headers: { Origin: 'https://cerevia.com' },
    });
    const corsResponse = new NextResponse(null);
    applyCors(corsRequest, corsResponse);
    if (corsResponse.headers.get('Access-Control-Allow-Origin') !== 'https://cerevia.com') {
      throw new Error(`CORS did not allow trusted origin, got ${corsResponse.headers.get('Access-Control-Allow-Origin')}`);
    }

    // Rejects untrusted origin
    const badCorsRequest = new Request('http://localhost:3000/api/streak', {
      headers: { Origin: 'https://malicious-site.com' },
    });
    const badCorsResponse = new NextResponse(null);
    applyCors(badCorsRequest, badCorsResponse);
    if (badCorsResponse.headers.get('Access-Control-Allow-Origin') !== null) {
      throw new Error('CORS allowed an untrusted origin');
    }
    console.log('✅ CORS policies validated.');

    // ----------------------------------------------------
    // Test 3: Request Sanitization
    // ----------------------------------------------------
    console.log('- Testing HTML sanitization and string trimming...');
    const maliciousPayload = {
      title: '   Hello World! <script>alert("XSS")</script> ',
      nested: {
        code: '  <img src="x" onerror="stealCookies()"/>  ',
      },
      list: ['   safe string  ', ' <iframe src="url"></iframe> '],
      safeInt: 42,
    };

    const sanitized = sanitizeData(maliciousPayload);
    if (sanitized.title !== 'Hello World! &lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;') {
      throw new Error(`HTML injection was not escaped or trimmed: ${sanitized.title}`);
    }
    if (sanitized.nested.code !== '&lt;img src=&quot;x&quot; onerror=&quot;stealCookies()&quot;&#x2F;&gt;') {
      throw new Error(`Nested HTML injection was not escaped: ${sanitized.nested.code}`);
    }
    if (sanitized.list[0] !== 'safe string' || sanitized.list[1] !== '&lt;iframe src=&quot;url&quot;&gt;&lt;&#x2F;iframe&gt;') {
      throw new Error(`Array values were not correctly sanitized: ${JSON.stringify(sanitized.list)}`);
    }
    if (sanitized.safeInt !== 42) {
      throw new Error(`Non-string value got corrupted: ${sanitized.safeInt}`);
    }
    console.log('✅ Request Sanitization validated.');

    // ----------------------------------------------------
    // Test 4: Rate Limiting
    // ----------------------------------------------------
    console.log('- Testing Rate Limiter...');
    const ip = '192.168.1.100';
    const route = '/api/auth/login';
    const limit = 2;
    const windowSeconds = 10;

    // Reset Map cache for test isolation
    // (memory cache is inside security module but we can use unique route to isolate)
    const testRoute = `${route}-${Date.now()}`;

    const r1 = await checkRateLimit(ip, testRoute, limit, windowSeconds);
    const r2 = await checkRateLimit(ip, testRoute, limit, windowSeconds);
    const r3 = await checkRateLimit(ip, testRoute, limit, windowSeconds);

    if (!r1.allowed || !r2.allowed) {
      throw new Error(`Allowed requests were blocked: r1: ${r1.allowed}, r2: ${r2.allowed}`);
    }
    if (r3.allowed) {
      throw new Error('Rate limit was exceeded but request was allowed');
    }
    if (r3.remaining !== 0) {
      throw new Error(`Expected remaining requests to be 0, got ${r3.remaining}`);
    }
    console.log('✅ Rate Limiting validated.');

    // ----------------------------------------------------
    // Test 5: Client IP parsing
    // ----------------------------------------------------
    console.log('- Testing Client IP extraction...');
    const ipReq = new Request('http://localhost:3000', {
      headers: { 'X-Forwarded-For': '203.0.113.195, 70.41.3.18, 150.172.238.178' },
    });
    const parsedIp = getClientIp(ipReq);
    if (parsedIp !== '203.0.113.195') {
      throw new Error(`Expected first IP in forwarding chain, got ${parsedIp}`);
    }
    console.log('✅ Client IP extraction validated.');

    // ----------------------------------------------------
    // Test 6: Secure Logging
    // ----------------------------------------------------
    console.log('- Testing Logging redaction of sensitive credentials...');
    const sensitiveLog = {
      email: 'user@example.com',
      password: 'SuperSecretPassword123',
      nested: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.payload.signature',
      },
      apiKey: 'secret-key-123',
    };

    const redacted = sanitizeLogData(sensitiveLog) as any;
    if (redacted.email !== 'user@example.com') {
      throw new Error('Safe data was mistakenly redacted');
    }
    if (redacted.password !== '[REDACTED]') {
      throw new Error(`Password was not redacted: ${redacted.password}`);
    }
    if (redacted.nested.accessToken !== '[REDACTED]') {
      throw new Error(`JWT access token was not redacted: ${redacted.nested.accessToken}`);
    }
    if (redacted.apiKey !== '[REDACTED]') {
      throw new Error(`API key was not redacted: ${redacted.apiKey}`);
    }

    const rawStringLog = 'User authentication failed for Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.payload.signature with password "mypassword"';
    const sanitizedStringLog = sanitizeLogData(rawStringLog) as string;
    if (sanitizedStringLog.includes('mypassword')) {
      throw new Error('Password string value was not redacted');
    }
    if (sanitizedStringLog.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')) {
      throw new Error('JWT token in string value was not redacted');
    }
    console.log('✅ Secure Logging redaction validated.');

  } catch (error) {
    console.error('❌ Security tests failed:', error);
    process.exit(1);
  }

  console.log('🎉 Production Security Hardening Integration Tests Passed Successfully! ✅');
}

runSecurityTests();
