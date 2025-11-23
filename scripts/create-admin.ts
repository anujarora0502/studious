import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdminUser() {
  const email = 'admin@studious.com';
  const password = 'Admin@123';
  const name = 'Admin User';

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  });

  if (existingAdmin) {
    console.log('Admin user already exists!');
    console.log('Email:', email);
    console.log('Password:', password);
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'ADMIN'
    }
  });

  console.log('✅ Admin user created successfully!');
  console.log('-----------------------------------');
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Role:', admin.role);
  console.log('-----------------------------------');
  console.log('You can now login with these credentials.');
}

createAdminUser()
  .catch((e) => {
    console.error('Error creating admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
