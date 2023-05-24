import { PrismaClient } from '@prisma/client';
import { userSeeder } from './seeder/user.seeder';
import { employeeSeeder } from './seeder/employee.seeder';

const prisma = new PrismaClient();

async function seed() {
  // auth
  await userSeeder();
  await employeeSeeder();
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
