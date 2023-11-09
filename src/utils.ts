import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import qs from 'qs';

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

export const getUpdatedQueryString = (newParams: object) => {
  const currentQueryParams = qs.parse(location.search.slice(1));
  const updatedQueryParams = {
    ...currentQueryParams,
    ...newParams,
  };
  return `?${qs.stringify(updatedQueryParams)}`;
};

export const toHHMMSS = (seconds: number) => {
  const range: [number, number] = seconds < 3600 ? [14, 19] : [11, 16];
  return new Date(seconds * 1000).toISOString().substring(...range);
};

export const getYear = (date: string) => {
  return new Date(date).getFullYear();
};
