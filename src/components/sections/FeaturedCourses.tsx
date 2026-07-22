'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Clock, BookOpen, Star, ArrowRight } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: string;
  image: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  rating: number;
  students: string;
  badge?: string;
  description: string;
}

const COURSES: Course[] = [
  {
    id: 'python',
    title: 'Python for AI & Data Science Mastery',
    category: 'AI & Data',
    image: '/images/courses/python-mastery.webp',
    difficulty: 'Beginner',
    duration: '16 hrs',
    lessons: 42,
    rating: 4.9,
    students: '4,820',
    badge: 'Popular',
    description:
      'Master Python syntax, object-oriented design, data processing with NumPy/Pandas, and AI model basics.',
  },
  {
    id: 'java',
    title: 'Java Enterprise Architecture & Spring Boot',
    category: 'Coding',
    image: '/images/courses/java-enterprise.webp',
    difficulty: 'Intermediate',
    duration: '24 hrs',
    lessons: 58,
    rating: 4.8,
    students: '3,150',
    description:
      'Build enterprise-grade microservices with Spring Boot, PostgreSQL, JPA, and Docker deployment.',
  },
  {
    id: 'react',
    title: 'Modern React 19 & Next.js Architecture',
    category: 'Coding',
    image: '/images/courses/react-architecture.webp',
    difficulty: 'Intermediate',
    duration: '18 hrs',
    lessons: 36,
    rating: 4.95,
    students: '6,400',
    badge: 'Trending',
    description:
      'Master React Server Components, Server Actions, state management, and high-performance web applications.',
  },
  {
    id: 'nodejs',
    title: 'Node.js Backend & Scalable API Engineering',
    category: 'Coding',
    image: '/images/courses/nodejs-backend.webp',
    difficulty: 'Intermediate',
    duration: '14 hrs',
    lessons: 32,
    rating: 4.85,
    students: '2,900',
    description:
      'Architect secure REST and GraphQL APIs, handle async operations, WebSockets, and Redis caching.',
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence & LLM Fine-Tuning',
    category: 'AI & Data',
    image: '/images/courses/ai-engineering.webp',
    difficulty: 'Advanced',
    duration: '22 hrs',
    lessons: 48,
    rating: 4.98,
    students: '5,100',
    badge: 'Featured',
    description:
      'Build RAG pipelines, fine-tune open-weight LLMs, vectorize text with LangChain, and deploy AI agents.',
  },
  {
    id: 'cloud',
    title: 'Cloud Native & Kubernetes Engineering',
    category: 'Cloud',
    image: '/images/courses/cloud-native.webp',
    difficulty: 'Advanced',
    duration: '20 hrs',
    lessons: 40,
    rating: 4.9,
    students: '2,100',
    description:
      'Provision AWS/GCP cloud infrastructure, containerize apps with Docker, and orchestrate with Kubernetes.',
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms Masterclass',
    category: 'Architecture',
    image: '/images/courses/dsa-masterclass.webp',
    difficulty: 'Intermediate',
    duration: '30 hrs',
    lessons: 85,
    rating: 4.96,
    students: '8,200',
    badge: 'Must Learn',
    description:
      'Solve 150+ LeetCode style problems, master trees, graphs, dynamic programming, and complexity trade-offs.',
  },
  {
    id: 'system-design',
    title: 'Distributed System Design & Microservices',
    category: 'Architecture',
    image: '/images/courses/system-design.webp',
    difficulty: 'Advanced',
    duration: '26 hrs',
    lessons: 50,
    rating: 4.99,
    students: '4,300',
    badge: 'Top Rated',
    description:
      'Design high-concurrency systems like Netflix and Uber. Learn load balancing, sharding, and fault tolerance.',
  },
];

const CATEGORIES = ['All', 'Coding', 'AI & Data', 'Architecture', 'Cloud'];

export function FeaturedCourses() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredCourses =
    activeTab === 'All'
      ? COURSES
      : COURSES.filter((course) => course.category === activeTab);

  return (
    <section
      id="courses"
      className="border-y border-zinc-200/60 bg-white py-24 dark:border-zinc-800/60 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Curated Syllabus</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
              Featured Courses
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              Master industry-demanded tech skills through hands-on coding
              environments and real-world project scenarios.
            </p>
          </div>

          {/* Filter Category Tabs */}
          <div className="scrollbar-none flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  activeTab === category
                    ? 'bg-zinc-950 text-white shadow-md dark:bg-white dark:text-zinc-950'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group relative flex transform flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800/80 dark:bg-zinc-900/60"
            >
              <div>
                {/* Course Cover Image */}
                <div className="relative mb-4 h-44 w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Category Pill */}
                  <span className="absolute left-3 top-3 rounded-full bg-zinc-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-md">
                    {course.category}
                  </span>

                  {/* Badge */}
                  {course.badge && (
                    <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-zinc-950 shadow-md">
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Rating & Difficulty */}
                <div className="mb-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    <span>{course.rating}</span>
                    <span className="font-normal text-zinc-400">
                      ({course.students})
                    </span>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      course.difficulty === 'Beginner'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : course.difficulty === 'Intermediate'
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                    }`}
                  >
                    {course.difficulty}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-zinc-950 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {course.title}
                </h3>

                {/* Short Description */}
                <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {course.description}
                </p>
              </div>

              {/* Course Meta Info & CTA */}
              <div className="flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" /> {course.lessons}{' '}
                    lessons
                  </span>
                </div>

                <a
                  href="/register"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition-all group-hover:bg-zinc-950 group-hover:text-white dark:bg-zinc-800 dark:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-950"
                  aria-label={`Enroll in ${course.title}`}
                >
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
