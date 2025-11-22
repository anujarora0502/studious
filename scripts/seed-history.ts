import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();

  if (!user) {
    console.log('No user found. Please sign up first.');
    return;
  }

  console.log(`Seeding data for user: ${user.email}`);

  const today = new Date();
  
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split('T')[0];

    await prisma.task.create({
      data: {
        title: `Study Session - ${dateString}`,
        isCompleted: true,
        date: dateString,
        userId: user.id,
      },
    });
    console.log(`Created task for ${dateString}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
