export interface Topic {
    id: string;
    topicName: string;
    topicDescription: string;
    order: number;
    status: 'not started' | 'in progress' | 'completed';
    isUserAdded: boolean;
  }
  
  export interface Lesson {
    id: string;
    number: number;
    title: string;
    date: string;
    status: string;
    topics: Topic[];
    brief: string;
  }