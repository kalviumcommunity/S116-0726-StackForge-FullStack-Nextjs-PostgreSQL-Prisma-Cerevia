import { prisma } from '../src/lib/prisma';
import { getUserProfile, updateUserProfile } from '../src/lib/services/profile';
import { updateProfileSchema } from '../src/lib/validation/profile';
import bcryptjs from 'bcryptjs';

async function runTests() {
  console.log('🧪 Starting Profile Service Integration Tests...');

  const testEmail = 'profile-test-user@example.com';
  let testUserId = '';

  try {
    // 1. Clean up old test user if exists
    await prisma.user.deleteMany({
      where: { email: testEmail },
    });

    // 2. Seed a test user
    const passwordHash = await bcryptjs.hash('testpassword123', 10);
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        password: passwordHash,
        fullName: 'Original Test Name',
        avatar: 'https://example.com/avatar.png',
        bio: 'Original Bio text.',
      },
    });
    testUserId = user.id;
    console.log(`- Created test user with ID: ${testUserId}`);

    // 3. Test getUserProfile
    const profile = await getUserProfile(testUserId);
    if (profile.fullName !== 'Original Test Name' || profile.bio !== 'Original Bio text.') {
      throw new Error('getUserProfile returned incorrect user profile details');
    }
    console.log('✅ getUserProfile retrieved correct profile details.');

    // 4. Test updateUserProfile (Valid Update)
    const updated = await updateUserProfile(testUserId, {
      fullName: 'Updated Name',
      avatar: 'https://example.com/new-avatar.png',
      bio: 'This is my updated bio description.',
    });

    if (
      updated.fullName !== 'Updated Name' ||
      updated.avatar !== 'https://example.com/new-avatar.png' ||
      updated.bio !== 'This is my updated bio description.'
    ) {
      throw new Error('updateUserProfile failed to apply changes correctly');
    }
    console.log('✅ updateUserProfile successfully applied profile updates.');

    // 5. Test validation schema with invalid URL
    const invalidResult = updateProfileSchema.safeParse({
      avatar: 'invalid-url-format',
    });
    if (invalidResult.success) {
      throw new Error('Validation schema failed to catch invalid avatar URL');
    }
    console.log('✅ Zod schema successfully caught and rejected invalid avatar URL.');

    // 6. Test validation schema with overly long bio
    const longBio = 'a'.repeat(501);
    const longBioResult = updateProfileSchema.safeParse({
      bio: longBio,
    });
    if (longBioResult.success) {
      throw new Error('Validation schema failed to catch overly long bio');
    }
    console.log('✅ Zod schema successfully caught and rejected overly long bio (500+ chars).');

  } catch (error) {
    console.error('❌ Integration test failed:', error);
    process.exit(1);
  } finally {
    // Clean up
    if (testUserId) {
      await prisma.user.delete({
        where: { id: testUserId },
      });
      console.log('- Cleaned up test user.');
    }
    await prisma.$disconnect();
  }

  console.log('🎉 All Profile Integration Tests Passed Successfully! ✅');
  process.exit(0);
}

runTests();
