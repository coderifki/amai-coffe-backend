import { buildSeederFilePath } from './seeder.helper';
import * as csv from 'csvtojson/v2';
import { PrismaClient } from '@prisma/client';
import * as moment from 'moment';

const prisma = new PrismaClient();

export async function employeeSeeder() {
  const seedfile = buildSeederFilePath('csv', 'employee.csv');

  return new Promise((resolve, reject) => {
    csv()
      .fromFile(seedfile)
      .subscribe(async (data, lineNumber) => {
        await prisma.employee.upsert({
          where: {
            id: data.id,
          },
          create: {
            address: data.address,
            user_id: data.user_id,
            birth_date: moment(data.birth_date, 'DD MMMM YYYY').toDate(),
          },
          update: {
            address: data.address,
            user_id: data.user_id,
            birth_date: moment(data.birth_date, 'DD MMMM YYYY').toDate(),
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
