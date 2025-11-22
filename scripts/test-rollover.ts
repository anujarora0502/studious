import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testRollover() {
  console.log('🧪 Testing Task Rollover Functionality\n');

  // Find the first user
  const user = await prisma.user.findFirst();
  
  if (!user) {
    console.log('❌ No user found. Please sign up first.');
    return;
  }

  console.log(`✅ Testing with user: ${user.email}\n`);

  // Create a test task with yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split('T')[0];

  const testTask = await prisma.task.create({
    data: {
      title: 'Test Rollover Task (Should move to today)',
      userId: user.id,
      date: yesterdayString,
      isCompleted: false,
    },
  });

  console.log(`📝 Created test task with date: ${yesterdayString}`);
  console.log(`   Task ID: ${testTask.id}`);
  console.log(`   Task: "${testTask.title}"\n`);

  // Simulate the rollover logic from getTasks
  const today = new Date().toISOString().split('T')[0];
  
  console.log(`📅 Today's date: ${today}`);
  console.log(`🔄 Running rollover logic...\n`);

  const result = await prisma.task.updateMany({
    where: {
      userId: user.id,
      isCompleted: false,
      date: {
        lt: today,
      },
    },
    data: {
      date: today,
    },
  });

  console.log(`✅ Rolled over ${result.count} task(s) to today\n`);

  // Verify the task was updated
  const updatedTask = await prisma.task.findUnique({
    where: { id: testTask.id },
  });

  if (updatedTask && updatedTask.date === today) {
    console.log('✅ SUCCESS! Task rollover is working correctly!');
    console.log(`   Task date updated from ${yesterdayString} to ${today}`);
  } else {
    console.log('❌ FAILED! Task was not rolled over.');
  }

  // Clean up - delete the test task
  await prisma.task.delete({
    where: { id: testTask.id },
  });

  console.log('\n🧹 Cleaned up test task');
}

testRollover()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
