import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function abbreviateString(
  str: string,
  startLength: number = 3,
  endLength: number = 4
): string {
  if (str.length <= startLength + endLength) {
    return str;
  }
  return str.slice(0, startLength) + '...' + str.slice(-endLength);
}
