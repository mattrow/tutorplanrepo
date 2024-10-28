export interface Topic {
    id: string;
    topicName: string;
    topicDescription?: string;
    order: number;
    status?: string;
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