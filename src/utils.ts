import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import * as yup from 'yup';
import { IMAGE_MAX_SIZE, IMAGE_EXT } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const allowedMimeTypes = IMAGE_EXT.map((ext) => `image/${ext}`);

export const imageSchema = yup
  .mixed<File>()
  .defined()
  .test('size', `Error: file size exceeds ${IMAGE_MAX_SIZE}MB`, (file) => file.size / 1e6 < IMAGE_MAX_SIZE)
  .test('extension', 'Error: file extension is not valid', (file) => allowedMimeTypes.includes(file.type));
