import { PrismaClient, Roles } from '@prisma/client';

const client = new PrismaClient();

const seed = async () => {
}

client.$connect()
    .then(seed)
    .catch(console.error)
    .finally(() => {
        client.$disconnect();
        console.log('Database seeded successfully');
    })