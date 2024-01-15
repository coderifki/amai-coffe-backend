import { BadRequestException } from '@nestjs/common';
import { MIME_TYPE } from '../enums/file-mimetype.enum';

export function validateFileExtension(
  fileOrMimeType: Express.Multer.File | string,
  allowed: MIME_TYPE[],
  fileName?: string,
): boolean {
  try {
    const fileExtension =
      typeof fileOrMimeType === 'string'
        ? fileOrMimeType
        : fileOrMimeType.mimetype;

    if (!allowed.includes(fileExtension as MIME_TYPE)) {
      throw new BadRequestException(
        `File${
          fileName ? `(${fileName})` : ''
        } extension ${fileExtension} is not allowed, allowed extensions are: ${allowed}`,
      );
    }
    return true;
  } catch (error) {
    throw error;
  }
}
