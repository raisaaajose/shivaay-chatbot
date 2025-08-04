import { Request, Response, NextFunction } from "express";
import ChatSession from "../../models/chatSession.model";
import { log, formatNotification } from "../../utils/logging/logger";
import type { IMessage } from "../../types/chat.types";

const addMessagesBatchForAI = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionId } = req.params;
    const { messages } = req.body as { messages: IMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      log({ type: "error", message: "Messages array is required" });
      return res
        .status(400)
        .json(formatNotification("Messages array is required", "error"));
    }

    // Validate message structure
    for (const message of messages) {
      if (
        !message.id ||
        !message.content ||
        !message.sender ||
        !["user", "ai"].includes(message.sender)
      ) {
        log({ type: "error", message: "Invalid message structure" });
        return res
          .status(400)
          .json(formatNotification("Invalid message structure", "error"));
      }
    }

    const chatSession = await ChatSession.findOne({ sessionId });
    if (!chatSession) {
      log({ type: "error", message: `Chat session not found: ${sessionId}` });
      return res
        .status(404)
        .json(formatNotification("Chat session not found", "error"));
    }

    // Add all messages with proper timestamp conversion
    const processedMessages = messages.map((msg) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));

    chatSession.messages.push(...processedMessages);
    chatSession.lastActivity = new Date();

    await chatSession.save();

    log({
      type: "success",
      message: `Added ${messages.length} messages to session: ${sessionId} via AI`,
    });

    // Add message count to the response
    const sessionWithCount = {
      ...chatSession.toObject(),
      messageCount: chatSession.messages ? chatSession.messages.length : 0,
    };

    res.json({
      session: sessionWithCount,
      ...formatNotification(
        `Added ${messages.length} messages successfully`,
        "success"
      ),
    });
  } catch (error) {
    log({
      type: "error",
      message: "Error adding messages batch for AI",
      meta: error,
    });
    next(error);
  }
};

export default addMessagesBatchForAI;
