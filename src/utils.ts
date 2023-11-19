import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'qs';
import { SerializedError } from '@reduxjs/toolkit';

export const promiseTimeout = <T>(ms: number, promise: Promise<T>) => {
  let timerID: NodeJS.Timeout;

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

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof error.message === 'string'
  );
}

export function toPlainError(error: FetchBaseQueryError | SerializedError | undefined) {
  if (!error) return error;

  if (isFetchBaseQueryError(error)) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
    return new Error(errMsg);
  }

  if (isErrorWithMessage(error)) {
    return error;
  }

  throw new Error('Unknown error');
}
