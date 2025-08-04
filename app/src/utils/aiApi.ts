import { aiInstance } from "./api";

interface ChatRequest {
  session_id: string;
  user_message: string;
  user_id?: string;
}

/**
 * Send a chat message to the AI backend
 * @param sessionId - Unique session identifier
 * @param userMessage - The user's message
 * @param userId - Optional user ID for session creation
 * @returns Promise<string> - The AI's response
 */
export const sendChatMessage = async (
  sessionId: string,
  userMessage: string,
  userId?: string
): Promise<string> => {
  try {
    const response = await aiInstance.post<string>("/chat", {
      session_id: sessionId,
      user_message: userMessage,
      user_id: userId,
    } as ChatRequest);

    return response.data;
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw new Error("Failed to send message to AI backend");
  }
};

/**
 * Check if AI backend is healthy
 * @returns Promise<boolean> - Whether the AI backend is responding
 */
export const checkAIHealth = async (): Promise<boolean> => {
  try {
    const response = await aiInstance.get("/");
    return response.status === 200;
  } catch (error) {
    console.error("AI backend health check failed:", error);
    return false;
  }
};

/**
 * Generate a unique session ID for chat sessions
 * @returns string - A unique session identifier
 */
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
