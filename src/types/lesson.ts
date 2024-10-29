export interface Topic {
    id: string;
    topicName: string;
    topicDescription: string;
    order: number;
    status: 'not started' | 'in progress' | 'completed';
    type: 'communication' | 'vocabulary' | 'grammar';
    isUserAdded: boolean;
  }
  
  export interface GeneratedTopic {
    id: string;
    title: string;
    content: string;
  }
  
  export interface Lesson {
    id: string;
    number: number;
    title: string;
    date: string;
    status: string;
    topics: Topic[];
    brief: string;
    generated?: boolean;
    generatedTopics?: GeneratedTopic[];
  }