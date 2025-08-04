import { Request, Response, NextFunction } from "express";
import ChatSession from "../../models/chatSession.model";
import { log, formatNotification } from "../../utils/logging/logger";
import type { IUser } from "../../types/user.types";
import type { IChatSessionCreate } from "../../types/chat.types";

const createChatSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.isAuthenticated?.() || !req.user) {
      log({
        type: "error",
        message: "Authentication required to create chat session",
      });
      return res
        .status(401)
        .json(formatNotification("Authentication required", "error"));
    }

    const user = req.user as IUser;
    const { sessionId, title } = req.body as IChatSessionCreate;

    if (!sessionId) {
      log({ type: "error", message: "Session ID is required" });
      return res
        .status(400)
        .json(formatNotification("Session ID is required", "error"));
    }

    // Check if session already exists
    const existingSession = await ChatSession.findOne({ sessionId });
    if (existingSession) {
      log({
        type: "warning",
        message: `Chat session already exists: ${sessionId}`,
      });
      return res
        .status(409)
        .json(formatNotification("Chat session already exists", "error"));
    }

    const chatSession = new ChatSession({
      sessionId,
      userId: user._id,
      title: title || "New Chat",
      messages: [],
      isShared: false,
      lastActivity: new Date(),
    });

    await chatSession.save();

    log({ type: "success", message: `Chat session created: ${sessionId}` });

    // Add message count to the response
    const sessionWithCount = {
      ...chatSession.toObject(),
      messageCount: chatSession.messages ? chatSession.messages.length : 0,
    };

    res.status(201).json({
      ...formatNotification("Chat session created successfully", "success"),
      session: sessionWithCount,
    });
  } catch (err) {
    log({ type: "error", message: "Failed to create chat session", meta: err });
    next(err);
  }
};

export default createChatSession;
