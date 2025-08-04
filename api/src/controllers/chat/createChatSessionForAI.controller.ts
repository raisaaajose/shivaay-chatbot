import { Request, Response, NextFunction } from "express";
import ChatSession from "../../models/chatSession.model";
import { log, formatNotification } from "../../utils/logging/logger";
import User from "../../models/user.model";

const createChatSessionForAI = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionId, userId, title } = req.body;

    if (!sessionId) {
      log({ type: "error", message: "Session ID is required" });
      return res
        .status(400)
        .json(formatNotification("Session ID is required", "error"));
    }

    if (!userId) {
      log({ type: "error", message: "User ID is required" });
      return res
        .status(400)
        .json(formatNotification("User ID is required", "error"));
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      log({ type: "error", message: `User not found: ${userId}` });
      return res
        .status(404)
        .json(formatNotification("User not found", "error"));
    }

    // Check if session already exists
    const existingSession = await ChatSession.findOne({ sessionId });
    if (existingSession) {
      log({
        type: "info",
        message: `Chat session already exists: ${sessionId}`,
      });
      return res.status(200).json({
        ...formatNotification("Chat session already exists", "info"),
        session: existingSession,
      });
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

    log({
      type: "success",
      message: `Chat session created by AI: ${sessionId}`,
    });

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
    log({
      type: "error",
      message: "Failed to create chat session for AI",
      meta: err,
    });
    next(err);
  }
};

export default createChatSessionForAI;
