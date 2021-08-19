import { PrismaClient } from '@prisma/client';
import User from './user';
import Tweet from './tweet';

let options = {};

if (process.env.NODE_ENV !== 'test') {
  options = { log: ['query', 'info'] };
}

const prisma = new PrismaClient(options);

const { user, tweet } = prisma;
export { user, tweet, User, Tweet };
export default prisma;
