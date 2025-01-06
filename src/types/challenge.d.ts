export interface Attachment {
    type: 'image' | 'video' | 'document';
    name: string;
  }
  
  export interface Remark {
    id: number;
    user: string;
    avatar: string;
    content: string;
    timestamp: string;
    likes: number;
  }
  
  export interface PlayerRemark {
    id: number;
    text: string;
    date: string;
  }
  
  export interface Ranking {
    rank: number;
    user: string;
    score: number;
    remarks: PlayerRemark[];
  }
  
  export interface Challenge {
    id: string;
    creator: {
      name: string;
      avatar: string;
      initials: string;
    };
    title: string;
    description: string;
    endTime: string;
    duration: string;
    reward: number;
    attachments: Attachment[];
    participantCount: number;
    remarks: Remark[];
    rankings: Ranking[];
  }
  export interface ChallengeFormData {
    title: string;
    description: string;
    challengeType: 'task' | 'prize' | 'blog';
    isTimeLimited: boolean;
    duration?: {
      value: number;
      unit: 'minutes' | 'hours' | 'days' | 'weeks';
    };
    reward?: string;
    isPrivate: boolean;
    participants?: string[];
    judges?: string[];
    isScheduled: boolean;
    startTime?: string;
    endTime?: string;
    attachments?: File[];
  }