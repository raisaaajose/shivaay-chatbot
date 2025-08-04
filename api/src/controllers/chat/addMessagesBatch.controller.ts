import { Request, Response, NextFunction } from "express";
import ChatSession from "../../models/chatSession.model";
import { log, formatNotification } from "../../utils/logging/logger";
import type { IMessage } from "../../types/chat.types";

const addMessagesBatch = async (
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

    // Add all messages
    chatSession.messages.push(...messages);
    chatSession.lastActivity = new Date();

    await chatSession.save();

    log({
      type: "success",
      message: `Added ${messages.length} messages to session: ${sessionId}`,
    });

    res.json({
      session: chatSession,
      ...formatNotification(
        `Added ${messages.length} messages successfully`,
        "success"
      ),
    });
  } catch (error) {
    log({ type: "error", message: "Error adding messages batch", meta: error });
    next(error);
  }
};

export default addMessagesBatch;
