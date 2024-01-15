import { BadRequestException } from '@nestjs/common';
import { convertBytesToMB } from './bytes.to.mb.converter';

export function validateFileSize(
  fileOrFileSize: Express.Multer.File | number,
  maxSize?: number,
  fileName?: string,
): boolean {
  try {
    const max = maxSize ? maxSize : 1024 * 1024 * 3; // default is 3MB

    const fileSize =
      typeof fileOrFileSize === 'number' ? fileOrFileSize : fileOrFileSize.size;

    if (fileSize > max) {
      throw new BadRequestException(
        `File${fileName ? `(${fileName})` : ''} size ${convertBytesToMB(
          fileSize,
        )} is larger than ${convertBytesToMB(max)} bytes`,
      );
    }
    return true;
  } catch (error) {
    throw error;
  }
}
