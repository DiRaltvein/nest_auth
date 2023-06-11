import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const seed = async () => {
    await client.user.createMany({
        data: [
            
        ]
    })
}

client.$connect()
    .then(seed)
    .catch(console.error)
    .finally(() => {
        client.$disconnect();
        console.log('Database seeded successfully');
    })