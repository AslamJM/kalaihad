import { type ClassValue, clsx } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function padNumber(n: number) {
  return n.toString().padStart(5, "0")
}

export function formatDate(date: Date) {
  return format(date, "PPP")
}