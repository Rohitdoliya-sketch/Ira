export type ScreenStep =
  | 'welcome'
  | 'service'
  | 'rating'
  | 'experience'
  | 'generating'
  | 'review-ready'
  | 'thank-you';

export interface ServiceItem {
  id: string;
  label: string;
  category?: string;
  isCustom?: boolean;
}

export interface ReviewState {
  services: string[];
  customService: string;
  rating: number | null; // 1 - 5
  standouts: string[];
  otherNotes: string;
  generatedReview: string;
  variationIndex: number;
}
