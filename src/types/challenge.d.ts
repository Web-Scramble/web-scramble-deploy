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