import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';

export const promiseTimeout = <T>(ms: number, promise: Promise<T>) => {
  let timerID: number;

  const timer = new Promise((_, reject) => {
    timerID = setTimeout(reject, ms);
  });

  return Promise.race([promise, timer]).then((result) => {
    clearTimeout(timerID);
    return result;
  });
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
