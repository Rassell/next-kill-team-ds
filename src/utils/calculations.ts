import type { Dataslate, DataslateStats } from '../types/Dataslate';

/**
 * Calculate the average number of days between dataslate publications
 */
export function calculateAverageDaysBetweenPosts(dataslates: Dataslate[]): number {
  if (dataslates.length < 2) {
    return 0;
  }

  // Sort by date (oldest first)
  const sorted = [...dataslates].sort(
    (a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
  );

  let totalDays = 0;
  for (let i = 1; i < sorted.length; i++) {
    const prevDate = new Date(sorted[i - 1].publishedDate);
    const currDate = new Date(sorted[i].publishedDate);
    const diffInMs = currDate.getTime() - prevDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    totalDays += diffInDays;
  }

  return totalDays / (sorted.length - 1);
}

/**
 * Get the most recent dataslate
 */
export function getLastPost(dataslates: Dataslate[]): Dataslate | null {
  if (dataslates.length === 0) {
    return null;
  }

  return [...dataslates].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  )[0];
}

/**
 * Calculate statistics and predict the next dataslate date
 */
export function calculateDataslateStats(dataslates: Dataslate[]): DataslateStats | null {
  if (dataslates.length === 0) {
    return null;
  }

  const lastPost = getLastPost(dataslates);
  if (!lastPost) {
    return null;
  }

  const averageDays = calculateAverageDaysBetweenPosts(dataslates);
  const lastPostDate = new Date(lastPost.publishedDate);
  
  // Add average days to last post date to predict next date
  const predictedNextDate = new Date(lastPostDate);
  predictedNextDate.setDate(predictedNextDate.getDate() + Math.round(averageDays));

  return {
    averageDaysBetweenPosts: averageDays,
    predictedNextDate,
    lastPost,
    totalDataslates: dataslates.length,
  };
}

/**
 * Calculate time remaining until target date
 */
export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const now = new Date();
  const diffInMs = targetDate.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffInMs / 1000));

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
  };
}
