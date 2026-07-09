import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const lessons = [
  {
    id: 'e6a8d672-1d54-4f05-87d4-fdf6ee25690b',
    title: 'Introduction to HTML',
    description: 'Learn the basic structure of web pages, semantic elements, and nesting.',
    xpReward: 10,
    difficulty: 'Beginner',
  },
  {
    id: 'f7b9e783-2e65-4f16-98e5-0ef7ff36701c',
    title: 'Introduction to CSS',
    description: 'Understand selectors, the box model, custom layout structures, and coloring.',
    xpReward: 15,
    difficulty: 'Beginner',
  },
  {
    id: 'a8c0f894-3f76-5f27-a9f6-1f880047812d',
    title: 'JavaScript Basics',
    description: 'Master fundamentals like variables, functions, scopes, and loops.',
    xpReward: 20,
    difficulty: 'Intermediate',
  },
  {
    id: 'b9d1a905-4087-6f38-b0a7-2f991158923e',
    title: 'Next.js App Router',
    description: 'Dive deep into layouts, pages, loading states, server components, and modern routing.',
    xpReward: 30,
    difficulty: 'Advanced',
  },
  {
    id: 'c0e2b016-5198-7f49-c1b8-3fa02269034f',
    title: 'Database Foundations with Prisma',
    description: 'Learn schema modeling, database migrations, and how to query PostgreSQL using Prisma ORM.',
    xpReward: 25,
    difficulty: 'Intermediate',
  },
];

async function main() {
  console.log('🌱 Starting database seeding...');

  for (const lesson of lessons) {
    const upserted = await prisma.lesson.upsert({
      where: { id: lesson.id },
      update: {
        title: lesson.title,
        description: lesson.description,
        xpReward: lesson.xpReward,
        difficulty: lesson.difficulty,
      },
      create: {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        xpReward: lesson.xpReward,
        difficulty: lesson.difficulty,
      },
    });
    console.log(`- Upserted lesson: "${upserted.title}" (Difficulty: ${upserted.difficulty})`);
  }

  console.log('✅ Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
