import { Request, Response, NextFunction } from "express";
import ChatSession from "../../models/chatSession.model";
import { log, formatNotification } from "../../utils/logging/logger";
import type { IUser } from "../../types/user.types";
import crypto from "crypto";

const shareChatSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.isAuthenticated?.() || !req.user) {
      log({
        type: "error",
        message: "Authentication required to share chat session",
      });
      return res
        .status(401)
        .json(formatNotification("Authentication required", "error"));
    }

    const user = req.user as IUser;
    const { sessionId } = req.params;

    const chatSession = await ChatSession.findOne({
      sessionId,
      userId: user._id,
    });
    if (!chatSession) {
      log({
        type: "error",
        message: `Chat session not found or unauthorized: ${sessionId}`,
      });
      return res
        .status(404)
        .json(formatNotification("Chat session not found", "error"));
    }

    // Generate share ID if not exists
    if (!chatSession.shareId) {
      chatSession.shareId = crypto.randomBytes(16).toString("hex");
    }

    chatSession.isShared = true;
    await chatSession.save();

    log({ type: "success", message: `Chat session shared: ${sessionId}` });
    res.json({
      session: chatSession,
      shareUrl: `${process.env.FRONTEND_URL}/chat/shared/${chatSession.shareId}`,
      ...formatNotification("Chat session shared successfully", "success"),
    });
  } catch (error) {
    log({ type: "error", message: "Error sharing chat session", meta: error });
    next(error);
  }
};

export default shareChatSession;
