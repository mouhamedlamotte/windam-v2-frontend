import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();
  const isYesterday = date.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();
  
  if (isToday) {
    return format(date, 'hh:mm a'); // e.g., 10:00 PM
  } else if (isYesterday) {
    return 'yesterday';
  } else {
    return format(date, 'MM/dd/yy'); // e.g., 01/12/24
  }
}