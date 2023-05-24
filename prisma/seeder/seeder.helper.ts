import * as path from 'path';

export function buildSeederFilePath(...pathSegments: string[]): string {
  console.log(
    `load data from [file format, file name]:  ${pathSegments} , from ${path.join(
      process.cwd(),
      'prisma',
      'seeder',
      ...pathSegments,
    )}`,
  );
  return path.join(process.cwd(), 'prisma', 'seeder', ...pathSegments);
}
