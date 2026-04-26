import clsx, { type ClassValue } from "clsx";

/** Class-name merge helper used across components. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
