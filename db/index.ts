import { PrismaClient } from '@prisma/client';
import User from './user';
import Tweet from './tweet';

const prisma = new PrismaClient({ log: ['query', 'info'] });

const { user, tweet } = prisma;
export { user, tweet, User, Tweet };
export default prisma;
