import { buildSeederFilePath } from './seeder.helper';
import * as csv from 'csvtojson/v2';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../src/core/utils/passwordHash';
import moment from 'moment';

const prisma = new PrismaClient();

export async function userSeeder() {
  const seedfile = buildSeederFilePath('csv', 'user.csv');

  return new Promise((resolve, reject) => {
    csv()
      .fromFile(seedfile)
      .subscribe(async (data, lineNumber) => {
        await prisma.user.upsert({
          where: {
            id: data.id,
          },
          create: {
            id: data.id,
            phone: data.phone,
            email: data.email,
            password: await hashPassword(data.password),
            role: data.role,
          },
          update: {
            phone: data.phone,
            email: data.email,
            password: await hashPassword(data.password),
            role: data.role,
          },
        });
      })
      .on('done', (error) => {
        if (error) {
          return reject(error);
        }
        resolve('done');
      });
  });
}
