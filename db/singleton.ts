import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, MockProxy } from 'jest-mock-extended';

import prisma from './';
import User from './user';
import Tweet from './tweet';

// jest.mock('./', () => ({
//   __esModule: true,
//   default: mockDeep<PrismaClient>(),
//   User,
//   Tweet,
// }));

// beforeEach(() => {
//   mockReset(prismaMock);
// });

export const prismaMock = prisma as unknown as MockProxy<PrismaClient>;
