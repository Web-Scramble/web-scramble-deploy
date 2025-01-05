export type MediaType = 'video' | 'image' | 'document' | 'link';

export interface Media {
  type: MediaType;
  url?: string;
  description?: string;
  filename?: string;
  title?: string;
}

export interface Challenge {
  title: string;
  description: string;
}

export interface Submission {
  id: number;
  challenge: Challenge;
  details: string;
  submittedAt: string;
  media: Media[];
}

export interface Rating {
  rating: number;
  remarks: string;
}

export interface SubmissionVote {
  submissionId: number;
  rating: Rating;
}