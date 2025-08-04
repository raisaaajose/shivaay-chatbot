import { Request, Response, NextFunction } from "express";
import ChatSession from "../../models/chatSession.model";
import { log, formatNotification } from "../../utils/logging/logger";
import type { IUser } from "../../types/user.types";

const unshareChatSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.isAuthenticated?.() || !req.user) {
      log({
        type: "error",
        message: "Authentication required to unshare chat session",
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

    chatSession.isShared = false;
    chatSession.shareId = undefined;
    await chatSession.save();

    log({ type: "success", message: `Chat session unshared: ${sessionId}` });
    res.json({
      session: chatSession,
      ...formatNotification("Chat session unshared successfully", "success"),
    });
  } catch (error) {
    log({
      type: "error",
      message: "Error unsharing chat session",
      meta: error,
    });
    next(error);
  }
};

export default unshareChatSession;
