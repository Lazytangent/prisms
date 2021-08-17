import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'info'] });

const { user, tweet } = prisma;
export { user, tweet };
export default prisma;
