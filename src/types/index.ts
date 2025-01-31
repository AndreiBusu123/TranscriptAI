export interface Topic {
  id: string;
  name: string;
  parentId: string | null;
  children: Topic[];
}

export interface TranscriptionResult {
  text: string;
  topics: string[];
  timestamp: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}