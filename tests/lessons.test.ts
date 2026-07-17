import { prisma } from '../src/lib/prisma';
import { getLessons, getLessonById } from '../src/lib/services/lessons';
import { lessonIdSchema } from '../src/lib/validation/lessons';

async function runTests() {
  console.log('🧪 Starting Lessons Service Integration Tests...');

  const createdLessonIds: string[] = [];

  try {
    // 1. Setup - Create 3 test lessons
    const lessonsData = [
      {
        title: 'Alpha Introduction to Python',
        description: 'Learn the basic syntax and structures of Python.',
        difficulty: 'Beginner',
        xpReward: 15,
      },
      {
        title: 'Beta Functions and Scope',
        description: 'Deep dive into parameter passing and local variables.',
        difficulty: 'Intermediate',
        xpReward: 25,
      },
      {
        title: 'Gamma Classes and OOP',
        description: 'Understand encapsulation, inheritance, and polymorphism.',
        difficulty: 'Advanced',
        xpReward: 40,
      },
    ];

    for (const data of lessonsData) {
      const lesson = await prisma.lesson.create({ data });
      createdLessonIds.push(lesson.id);
    }
    console.log(`- Seeded ${createdLessonIds.length} temporary test lessons.`);

    // 2. Test getLessons (Default query)
    const allResult = await getLessons({
      page: 1,
      limit: 100,
      sortBy: 'title',
      sortOrder: 'asc',
    });
    // Filter out potential other seed data by checking only our created ones
    const relevantLessons = allResult.lessons.filter((l) =>
      createdLessonIds.includes(l.id),
    );
    if (relevantLessons.length !== 3) {
      throw new Error(
        `Expected to fetch 3 test lessons, got ${relevantLessons.length}`,
      );
    }
    console.log('✅ getLessons retrieved all test lessons successfully.');

    // 3. Test getLessons Search (Case Insensitive)
    const searchResultLower = await getLessons({
      page: 1,
      limit: 100,
      search: 'alpha',
      sortBy: 'title',
      sortOrder: 'asc',
    });
    const foundLower = searchResultLower.lessons.filter((l) =>
      createdLessonIds.includes(l.id),
    );
    if (foundLower.length !== 1 || !foundLower[0].title.startsWith('Alpha')) {
      throw new Error('Case insensitive search filtering failed');
    }
    console.log('✅ Case insensitive search works correctly.');

    // 4. Test getLessons Sorting
    const sortDescResult = await getLessons({
      page: 1,
      limit: 100,
      sortBy: 'title',
      sortOrder: 'desc',
    });
    const sortedRelevant = sortDescResult.lessons.filter((l) =>
      createdLessonIds.includes(l.id),
    );
    if (
      sortedRelevant[0].title !== 'Gamma Classes and OOP' ||
      sortedRelevant[2].title !== 'Alpha Introduction to Python'
    ) {
      throw new Error('Sorting by title DESC failed');
    }
    console.log('✅ Sorting by title DESC works correctly.');

    // 5. Test getLessons Pagination
    const pageResult = await getLessons({
      page: 1,
      limit: 1,
      sortBy: 'title',
      sortOrder: 'asc',
    });
    if (pageResult.pagination.limit !== 1 || pageResult.pagination.page !== 1) {
      throw new Error('Pagination metadata limit/page mismatch');
    }
    console.log('✅ Pagination metadata output verified.');

    // 6. Test getLessonById
    const targetId = createdLessonIds[1]; // Beta
    const detail = await getLessonById(targetId);
    if (detail.title !== 'Beta Functions and Scope') {
      throw new Error('getLessonById returned incorrect details');
    }
    console.log('✅ getLessonById successfully retrieved details.');

    // 7. Test getLessonById Not Found
    try {
      await getLessonById('00000000-0000-0000-0000-000000000000');
      throw new Error(
        'Expected getLessonById with empty UUID to throw error but it succeeded',
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.message !== 'Lesson not found') {
        throw err;
      }
    }
    console.log(
      '✅ getLessonById throws "Lesson not found" for nonexistent UUIDs.',
    );

    // 8. Test parameter validation schemas
    const validIdParse = lessonIdSchema.safeParse({ id: targetId });
    if (!validIdParse.success) {
      throw new Error('lessonIdSchema rejected a valid UUID');
    }
    const invalidIdParse = lessonIdSchema.safeParse({
      id: 'invalid-uuid-format',
    });
    if (invalidIdParse.success) {
      throw new Error('lessonIdSchema accepted an invalid UUID format');
    }
    console.log('✅ Zod UUID parameter validator validated successfully.');
  } catch (error) {
    console.error('❌ Integration test failed:', error);
    process.exit(1);
  } finally {
    // Cleanup
    if (createdLessonIds.length > 0) {
      await prisma.lesson.deleteMany({
        where: { id: { in: createdLessonIds } },
      });
      console.log('- Cleaned up temporary test lessons.');
    }
    await prisma.$disconnect();
  }

  console.log('🎉 All Lessons Integration Tests Passed Successfully! ✅');
  process.exit(0);
}

runTests();
