import { User } from "./authentication";

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
    // isTimeLimited: boolean;
    duration_value: number;
    duration_unit: 'minutes' | 'hours' | 'days' | 'weeks';
    reward: string;
    isPrivate: boolean;
    participants?: User[];
    judges?: User[];
    // isScheduled: boolean;
    startTime?: Date;
    endTime?: Date;
    attachments?: File[];
  }

  {
    "id": "243451c5-535f-4c2c-8091-a734e83c8a87",
    "name": "Code Sprint Updated",
    "description": "Updated description for the coding competition.",
    "creator_id": "f38aaa7a-7e68-4134-aea5-0a4c9c9d2eb9",
    "task_type_id": "d420ea48-076d-49a9-86d6-b2ee70972f1d",
    "is_public": false,
    "status": "draft",
    "reward_pool": "150.00",
    "start_time": "2024-01-01T10:00:00.000Z",
    "end_time": "2024-01-02T10:00:00.000Z",
    "created_at": "2025-01-01T07:58:40.077Z",
    "updated_at": "2025-01-01T08:04:15.926Z",
    "docs":["docs 1","docs 2"]
    
  }