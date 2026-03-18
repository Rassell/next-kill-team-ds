export interface Dataslate {
  title: string;
  link: string;
  publishedDate: string; // ISO 8601 format (YYYY-MM-DD)
}

export interface DataslateStats {
  averageDaysBetweenPosts: number;
  predictedNextDate: Date;
  lastPost: Dataslate;
  totalDataslates: number;
}
