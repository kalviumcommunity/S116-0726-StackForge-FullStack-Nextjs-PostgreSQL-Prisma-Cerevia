import { GET } from '../src/app/api/health/route';

async function runTests() {
  console.log('🧪 Starting Health Check Endpoint Integration Tests...');

  try {
    const req = new Request('http://localhost/api/health');
    // Invoke the GET route handler
    const response = await GET(req, { params: Promise.resolve({}) });

    if (!response) {
      throw new Error('Health check route returned empty response');
    }

    const data = await response.json();
    console.log('- Health Check Response Status:', response.status);
    console.log('- Health Check Body:', JSON.stringify(data, null, 2));

    // The health check should respond with either 200 (UP) or 503 (DOWN/DEGRADED)
    if (response.status !== 200 && response.status !== 503) {
      throw new Error(`Expected status 200 or 503, got ${response.status}`);
    }

    if (!data.status || (data.status !== 'UP' && data.status !== 'DOWN')) {
      throw new Error(`Unexpected health status value: ${data.status}`);
    }

    if (!data.services || !data.services.database || !data.services.redis) {
      throw new Error('Health check response is missing service details');
    }

    console.log('🎉 All Health Check Integration Tests Passed Successfully! ✅');
    process.exit(0);
  } catch (error) {
    console.error('❌ Health Check Integration Tests Failed:', error);
    process.exit(1);
  }
}

runTests();
