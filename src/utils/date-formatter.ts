/**
 * Date formatting utilities for consistent date display across the application
 */

/**
 * Formats a date string or Date object to a localized date string
 * @param date - Date string, Date object, or null/undefined
 * @param locale - Locale for formatting (default: 'en-US')
 * @param options - Intl.DateTimeFormatOptions for customization
 * @returns Formatted date string or fallback text
 */
export function formatDate(
  date: string | Date | null | undefined,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
): string {
  if (!date) return 'N/A';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }
    
    return dateObj.toLocaleDateString(locale, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
}

/**
 * Formats a date to a short format (MM/DD/YYYY)
 * @param date - Date string, Date object, or null/undefined
 * @returns Short formatted date string
 */
export function formatDateShort(date: string | Date | null | undefined): string {
  return formatDate(date, 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * Formats a date to a long format (January 1, 2024)
 * @param date - Date string, Date object, or null/undefined
 * @returns Long formatted date string
 */
export function formatDateLong(date: string | Date | null | undefined): string {
  return formatDate(date, 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats a date with time (Jan 1, 2024, 12:00 PM)
 * @param date - Date string, Date object, or null/undefined
 * @returns Formatted date and time string
 */
export function formatDateTime(date: string | Date | null | undefined): string {
  return formatDate(date, 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Formats a date to relative time (e.g., "2 days ago", "in 3 hours")
 * @param date - Date string, Date object, or null/undefined
 * @returns Relative time string
 */
export function formatRelativeTime(date: string | Date | null | undefined): string {
  if (!date) return 'N/A';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    
    // Define time intervals in seconds
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
    
    // If the date is in the future
    if (diffInSeconds < 0) {
      const absDiff = Math.abs(diffInSeconds);
      for (const [unit, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(absDiff / seconds);
        if (interval >= 1) {
          return `in ${interval} ${unit}${interval > 1 ? 's' : ''}`;
        }
      }
      return 'in a moment';
    }
    
    // If the date is in the past
    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / seconds);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
    
    return 'just now';
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return 'Invalid Date';
  }
}

/**
 * Formats a date for ISO string (YYYY-MM-DD)
 * @param date - Date string, Date object, or null/undefined
 * @returns ISO date string (YYYY-MM-DD) or empty string
 */
export function formatDateISO(date: string | Date | null | undefined): string {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    return dateObj.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting ISO date:', error);
    return '';
  }
}

/**
 * Checks if a date is today
 * @param date - Date string, Date object, or null/undefined
 * @returns Boolean indicating if the date is today
 */
export function isToday(date: string | Date | null | undefined): boolean {
  if (!date) return false;
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    
    return (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    );
  } catch {
    return false;
  }
}

/**
 * Checks if a date is yesterday
 * @param date - Date string, Date object, or null/undefined
 * @returns Boolean indicating if the date is yesterday
 */
export function isYesterday(date: string | Date | null | undefined): boolean {
  if (!date) return false;
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    return (
      dateObj.getDate() === yesterday.getDate() &&
      dateObj.getMonth() === yesterday.getMonth() &&
      dateObj.getFullYear() === yesterday.getFullYear()
    );
  } catch {
    return false;
  }
}