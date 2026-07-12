import { NextResponse } from 'next/server';
import { withApiHandler } from '@/lib/api-response';

const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Cerevia API Specification',
    version: '1.0.0',
    description:
      "Production-grade gamification engine for BYJU'S — powering daily learning streaks, XP level progression, and weekly competitive leaderboards.",
  },
  servers: [
    {
      url: '/api',
      description: 'Cerevia API Server',
    },
  ],
  security: [
    {
      BearerAuth: [],
    },
  ],
  paths: {
    '/auth/register': {
      post: {
        summary: 'Register User',
        description: 'Registers a new student profile on the Cerevia platform.',
        tags: ['Authentication'],
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password', 'fullName'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'student@example.com',
                  },
                  password: {
                    type: 'string',
                    minLength: 8,
                    example: 'securePassword123',
                  },
                  fullName: {
                    type: 'string',
                    example: 'Jane Doe',
                  },
                  avatar: {
                    type: 'string',
                    format: 'url',
                    example: 'https://example.com/avatar.png',
                    nullable: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User registered successfully.',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/StandardSuccess' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            id: { type: 'string', format: 'uuid' },
                            email: { type: 'string', format: 'email' },
                            fullName: { type: 'string' },
                            avatar: { type: 'string', nullable: true },
                            currentXP: { type: 'integer' },
                            totalXP: { type: 'integer' },
                            createdAt: { type: 'string', format: 'date-time' },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: 'Validation or malformed request payload error.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StandardError' },
              },
            },
          },
          '409': {
            description: 'Conflict error (email already registered).',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StandardError' },
              },
            },
          },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Login User',
        description: 'Authenticates a student and generates a JWT access token.',
        tags: ['Authentication'],
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'student@example.com',
                  },
                  password: {
                    type: 'string',
                    example: 'securePassword123',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login successful.',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/StandardSuccess' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            user: {
                              type: 'object',
                              properties: {
                                id: { type: 'string', format: 'uuid' },
                                email: { type: 'string', format: 'email' },
                                fullName: { type: 'string' },
                                avatar: { type: 'string', nullable: true },
                              },
                            },
                            token: {
                              type: 'string',
                              description: 'JWT Bearer Access Token',
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: 'Validation or malformed request payload error.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StandardError' },
              },
            },
          },
          '401': {
            description: 'Invalid credentials.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StandardError' },
              },
            },
          },
        },
      },
    },
    '/auth/me': {
      get: {
        summary: 'Get Authenticated User',
        description: 'Fetches details of the currently authenticated user.',
        tags: ['Authentication'],
        responses: {
          '200': {
            description: 'User details fetched successfully.',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/StandardSuccess' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            id: { type: 'string', format: 'uuid' },
                            email: { type: 'string', format: 'email' },
                            fullName: { type: 'string' },
                            avatar: { type: 'string', nullable: true },
                            currentXP: { type: 'integer' },
                            totalXP: { type: 'integer' },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid authentication token.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StandardError' },
              },
            },
          },
        },
      },
    },
    '/lessons': {
      get: {
        summary: 'List Lessons',
        description:
          'Fetches lessons with pagination, search, sorting, and difficulty filter.',
        tags: ['Lessons'],
        parameters: [
          {
            name: 'page',
            in: 'query',
            schema: { type: 'integer', default: 1 },
            description: 'Page number for pagination.',
          },
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 10 },
            description: 'Number of items per page.',
          },
          {
            name: 'search',
            in: 'query',
            schema: { type: 'string' },
            description: 'Substring search on lesson titles.',
          },
          {
            name: 'sortBy',
            in: 'query',
            schema: { type: 'string', enum: ['title', 'createdAt'] },
            description: 'Field to sort lessons by.',
          },
          {
            name: 'sortOrder',
            in: 'query',
            schema: { type: 'string', enum: ['asc', 'desc'] },
            description: 'Sort order (ascending or descending).',
          },
          {
            name: 'difficulty',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['Beginner', 'Intermediate', 'Advanced'],
            },
            description: 'Filter lessons by difficulty.',
          },
        ],
        responses: {
          '200': {
            description: 'Lessons fetched successfully.',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/StandardSuccess' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            lessons: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  id: { type: 'string', format: 'uuid' },
                                  title: { type: 'string' },
                                  description: { type: 'string' },
                                  difficulty: { type: 'string' },
                                  xpReward: { type: 'integer' },
                                  createdAt: { type: 'string', format: 'date-time' },
                                },
                              },
                            },
                            pagination: {
                              type: 'object',
                              properties: {
                                totalCount: { type: 'integer' },
                                page: { type: 'integer' },
                                limit: { type: 'integer' },
                                totalPages: { type: 'integer' },
                              },
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StandardError' },
              },
            },
          },
        },
      },
    },
    '/lessons/{id}': {
      get: {
        summary: 'Get Lesson Details',
        description: 'Retrieves metadata for a specific lesson by its UUID.',
        tags: ['Lessons'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'The unique UUID of the lesson.',
          },
        ],
        responses: {
          '200': {
            description: 'Lesson fetched successfully.',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/StandardSuccess' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            id: { type: 'string', format: 'uuid' },
                            title: { type: 'string' },
                            description: { type: 'string' },
                            difficulty: { type: 'string' },
                            xpReward: { type: 'integer' },
                            createdAt: { type: 'string', format: 'date-time' },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          '404': {
            description: 'Lesson not found.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StandardError' },
              },
            },
          },
        },
      },
    },
    '/lessons/{id}/complete': {
      post: {
        summary: 'Complete Lesson',
        description:
          'Records a lesson completion, increments streak, and issues XP rewards.',
        tags: ['Lessons'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'The unique UUID of the lesson completed.',
          },
        ],
        responses: {
          '201': {
            description: 'Lesson marked complete. XP and streak calculated.',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/StandardSuccess' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            id: { type: 'string', format: 'uuid' },
                            userId: { type: 'string', format: 'uuid' },
                            lessonId: { type: 'string', format: 'uuid' },
                            completedAt: { type: 'string', format: 'date-time' },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          '404': {
            description: 'Lesson or User not found.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StandardError' },
              },
            },
          },
          '409': {
            description: 'Conflict error (lesson already completed).',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StandardError' },
              },
            },
          },
        },
      },
    },
    '/lessons/progress': {
      get: {
        summary: 'Get Lessons Progress',
        description:
          'Retrieves list of completed lessons alongside remaining uncompleted lessons.',
        tags: ['Lessons'],
        responses: {
          '200': {
            description: 'Progress details retrieved.',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/StandardSuccess' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            completedLessons: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  id: { type: 'string', format: 'uuid' },
                                  title: { type: 'string' },
                                  completedAt: { type: 'string', format: 'date-time' },
                                },
                              },
                            },
                            remainingLessons: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  id: { type: 'string', format: 'uuid' },
                                  title: { type: 'string' },
                                  difficulty: { type: 'string' },
                                },
                              },
                            },
                            totalCompleted: { type: 'integer' },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    '/streak': {
      get: {
        summary: 'Get Current User Streak',
        description:
          "Fetches the authenticated user's current daily streak statistics.",
        tags: ['Streaks'],
        responses: {
          '200': {
            description: 'Streak stats fetched.',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/StandardSuccess' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            currentStreak: { type: 'integer' },
                            longestStreak: { type: 'integer' },
                            lastActivityAt: { type: 'string', format: 'date-time', nullable: true },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    '/user/streak': {
      get: {
        summary: 'Get Detailed User Streak',
        description:
          "Fetch-all alias endpoint that returns user's streak statistics.",
        tags: ['Streaks'],
        responses: {
          '200': {
            description: 'Streak stats retrieved.',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/StandardSuccess' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            currentStreak: { type: 'integer' },
                            longestStreak: { type: 'integer' },
                            lastActivityAt: { type: 'string', format: 'date-time', nullable: true },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    '/user/profile': {
      get: {
        summary: 'Get User Profile',
        description:
          "Fetches profile bio, avatar URL, and basic user data for the current user.",
        tags: ['Profile'],
        responses: {
          '200': {
            description: 'Profile fetched.',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/StandardSuccess' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            id: { type: 'string', format: 'uuid' },
                            fullName: { type: 'string' },
                            email: { type: 'string' },
                            avatar: { type: 'string', nullable: true },
                            bio: { type: 'string', nullable: true },
                            currentXP: { type: 'integer' },
                            totalXP: { type: 'integer' },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
      put: {
        summary: 'Update User Profile',
        description: "Updates profile fields such as fullName, bio, and avatar.",
        tags: ['Profile'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  fullName: { type: 'string' },
                  bio: { type: 'string', maxLength: 500, nullable: true },
                  avatar: { type: 'string', format: 'url', nullable: true },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Profile updated successfully.',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/StandardSuccess' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            id: { type: 'string', format: 'uuid' },
                            fullName: { type: 'string' },
                            avatar: { type: 'string', nullable: true },
                            bio: { type: 'string', nullable: true },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: 'Validation error.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StandardError' },
              },
            },
          },
        },
      },
    },
    '/user/xp': {
      get: {
        summary: 'Get XP Progression & History',
        description:
          "Fetches level progression stats alongside paginated history of XP events.",
        tags: ['XP & Gamification'],
        parameters: [
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 50 },
            description: 'Page size for history.',
          },
          {
            name: 'skip',
            in: 'query',
            schema: { type: 'integer', default: 0 },
            description: 'Offset size for history pagination.',
          },
        ],
        responses: {
          '200': {
            description: 'XP history and levels retrieved.',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/StandardSuccess' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            currentXP: { type: 'integer' },
                            totalXP: { type: 'integer' },
                            levelInfo: {
                              type: 'object',
                              properties: {
                                level: { type: 'integer' },
                                xpInCurrentLevel: { type: 'integer' },
                                xpRemaining: { type: 'integer' },
                                xpNeededForNextLevel: { type: 'integer' },
                                progressPercentage: { type: 'integer' },
                              },
                            },
                            history: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  id: { type: 'string', format: 'uuid' },
                                  xpEarned: { type: 'integer' },
                                  reason: { type: 'string' },
                                  timestamp: { type: 'string', format: 'date-time' },
                                  lesson: {
                                    type: 'object',
                                    properties: {
                                      id: { type: 'string' },
                                      title: { type: 'string' },
                                      difficulty: { type: 'string' },
                                    },
                                    nullable: true,
                                  },
                                },
                              },
                            },
                            pagination: {
                              type: 'object',
                              properties: {
                                limit: { type: 'integer' },
                                skip: { type: 'integer' },
                                totalCount: { type: 'integer' },
                              },
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    '/user/leaderboard': {
      get: {
        summary: 'Get Weekly Leaderboard',
        description:
          'Retrieves user rankings for a specified week and year. Cache-backed via Redis.',
        tags: ['Leaderboards'],
        parameters: [
          {
            name: 'week',
            in: 'query',
            schema: { type: 'integer' },
            description: 'ISO week number.',
          },
          {
            name: 'year',
            in: 'query',
            schema: { type: 'integer' },
            description: 'Four digit year integer.',
          },
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 10 },
            description: 'Page size limit.',
          },
          {
            name: 'skip',
            in: 'query',
            schema: { type: 'integer', default: 0 },
            description: 'Offset pagination skip.',
          },
        ],
        responses: {
          '200': {
            description: 'Leaderboard list retrieved.',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/StandardSuccess' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            leaderboard: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  userId: { type: 'string', format: 'uuid' },
                                  fullName: { type: 'string' },
                                  avatar: { type: 'string', nullable: true },
                                  weeklyXP: { type: 'integer' },
                                  rank: { type: 'integer' },
                                },
                              },
                            },
                            pagination: {
                              type: 'object',
                              properties: {
                                limit: { type: 'integer' },
                                skip: { type: 'integer' },
                                totalCount: { type: 'integer' },
                              },
                            },
                            metadata: {
                              type: 'object',
                              properties: {
                                week: { type: 'integer' },
                                year: { type: 'integer' },
                                startDate: { type: 'string', format: 'date-time' },
                                endDate: { type: 'string', format: 'date-time' },
                              },
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    '/user/leaderboard/rank': {
      get: {
        summary: 'Get User Leaderboard Rank',
        description:
          "Fetches rank status and weekly score of the current student.",
        tags: ['Leaderboards'],
        parameters: [
          {
            name: 'week',
            in: 'query',
            schema: { type: 'integer' },
            description: 'ISO week number.',
          },
          {
            name: 'year',
            in: 'query',
            schema: { type: 'integer' },
            description: 'Four digit year integer.',
          },
        ],
        responses: {
          '200': {
            description: 'User rank data retrieved.',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/StandardSuccess' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            userId: { type: 'string', format: 'uuid' },
                            weeklyXP: { type: 'integer' },
                            rank: { type: 'integer' },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Format: "Bearer [JWT]" in Authorization HTTP Header.',
      },
    },
    schemas: {
      StandardSuccess: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Operation completed successfully.' },
        },
      },
      StandardError: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Validation failed.' },
          errorCode: { type: 'string', example: 'VALIDATION_ERROR' },
          details: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                path: { type: 'string', example: 'email' },
                message: { type: 'string', example: 'Invalid email address.' },
              },
            },
            nullable: true,
          },
        },
      },
    },
  },
};

export const GET = withApiHandler(async () => {
  return NextResponse.json(openApiSpec);
});
