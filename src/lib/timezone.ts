/**
 * Get current date in Indian Standard Time (IST)
 * Returns date in YYYY-MM-DD format
 */
export function getTodayIST(): string {
  const now = new Date();
  
  // Convert to IST (UTC+5:30)
  const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
  const istTime = new Date(now.getTime() + istOffset);
  
  // Format as YYYY-MM-DD
  return istTime.toISOString().split('T')[0];
}

/**
 * Get current date and time in IST
 * Returns full Date object adjusted to IST
 */
export function getDateIST(): Date {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  return new Date(now.getTime() + istOffset);
}
