import api from "./api";
import type {
  ChatSession,
  ChatSessionCreate,
  ChatSessionUpdate,
  PaginatedChatSessions,
  Message,
} from "@/types/Chat/chat.types";

// Session management
export const createChatSession = async (
  data: ChatSessionCreate
): Promise<ChatSession> => {
  const response = await api.post<{ session: ChatSession }>("/api/chat", data);
  return response.data.session;
};

export const getChatSessions = async (
  page: number = 1,
  limit: number = 20
): Promise<PaginatedChatSessions> => {
  const response = await api.get<PaginatedChatSessions>("/api/chat", {
    params: { page, limit },
  });
  return response.data;
};

export const getChatSession = async (
  sessionId: string
): Promise<ChatSession> => {
  const response = await api.get<{ session: ChatSession }>(
    `/api/chat/${sessionId}`
  );
  return response.data.session;
};

export const getSharedChatSession = async (
  shareId: string
): Promise<ChatSession> => {
  const response = await api.get<{ session: ChatSession }>(
    `/api/chat/shared/${shareId}`
  );
  return response.data.session;
};

export const updateChatSession = async (
  sessionId: string,
  data: ChatSessionUpdate
): Promise<ChatSession> => {
  const response = await api.put<{ session: ChatSession }>(
    `/api/chat/${sessionId}`,
    data
  );
  return response.data.session;
};

export const deleteChatSession = async (sessionId: string): Promise<void> => {
  await api.delete(`/api/chat/${sessionId}`);
};

export const shareChatSession = async (
  sessionId: string
): Promise<{ session: ChatSession; shareUrl: string }> => {
  const response = await api.post<{ session: ChatSession; shareUrl: string }>(
    `/api/chat/${sessionId}/share`
  );
  return response.data;
};

export const unshareChatSession = async (
  sessionId: string
): Promise<ChatSession> => {
  const response = await api.delete<{ session: ChatSession }>(
    `/api/chat/${sessionId}/share`
  );
  return response.data.session;
};

export const addMessage = async (
  sessionId: string,
  message: Message
): Promise<ChatSession> => {
  const response = await api.post<{ session: ChatSession }>(
    `/api/chat/${sessionId}/messages`,
    {
      message,
    }
  );
  return response.data.session;
};

export const addMessagesBatch = async (
  sessionId: string,
  messages: Message[]
): Promise<ChatSession> => {
  const response = await api.post<{ session: ChatSession }>(
    `/api/chat/${sessionId}/messages/batch`,
    {
      messages,
    }
  );
  return response.data.session;
};
