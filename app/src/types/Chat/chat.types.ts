export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export interface ChatSession {
  _id: string;
  sessionId: string;
  userId: string;
  title: string;
  messages: Message[];
  isShared: boolean;
  shareId?: string;
  lastActivity: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatSessionCreate {
  sessionId: string;
  title?: string;
}

export interface ChatSessionUpdate {
  title?: string;
  isShared?: boolean;
}

export interface PaginatedChatSessions {
  sessions: ChatSession[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
