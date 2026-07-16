const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'NEXT_PUBLIC_APP_URL',
];

const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingVars.length > 0) {
  console.error('❌ ERROR: Missing required environment variables:');
  missingVars.forEach((envVar) => console.error(`  - ${envVar}`));
  console.error('\nDeployment aborted. Please configure these variables in your environment.');
  process.exit(1);
}

console.log('✅ Environment validation passed. All required variables are set.');
process.exit(0);
