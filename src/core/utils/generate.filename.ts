import { MIME_TYPE } from '../enums/file-mimetype.enum';
import { generateRandomString } from './generate.random.string';

export const generateFileName = (
  originalName: string,
  mimeType: MIME_TYPE,
): string => {
  return (
    new Date().getTime() +
    '-' + // current timestamp
    originalName.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10) + //get first 10 character without special character
    generateRandomString(5) + // 5 random string
    '.' +
    mimeType.split('/')[1]
  );
};
