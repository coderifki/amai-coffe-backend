// This file should exist in `src/common/helpers`
import * as fs from 'fs';
import { promisify } from 'util';

/**
 * Check if a file exists at a given path.
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
export const nestCheckIfFileOrDirectoryExists = (path: string): boolean => {
  return fs.existsSync(path);
};

/**
 * Writes a file at a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} fileName
 * @param {string} data
 *
 * @return {Promise<void>}
 */
export const nestCreateFile = async (
  path: string,
  fileName: string,
  data: string | Buffer,
): Promise<void> => {
  if (!nestCheckIfFileOrDirectoryExists(path)) {
    fs.mkdirSync(path);
  }

  const writeFile = promisify(fs.writeFile);

  return await writeFile(`${path}/${fileName}`, data, 'utf8');
};

/**
 * Delete file at the given path via a promise interface
 *
 * @param {string} path
 *
 * @returns {Promise<void>}
 */
export const nestDeleteFile = async (path: string): Promise<void> => {
  const unlink = promisify(fs.unlink);

  return await unlink(path);
};
