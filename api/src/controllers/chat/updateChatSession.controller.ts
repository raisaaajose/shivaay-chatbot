import { Request, Response, NextFunction } from "express";
import ChatSession from "../../models/chatSession.model";
import { log, formatNotification } from "../../utils/logging/logger";
import type { IUser } from "../../types/user.types";
import type { IChatSessionUpdate } from "../../types/chat.types";

const updateChatSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.isAuthenticated?.() || !req.user) {
      log({
        type: "error",
        message: "Authentication required to update chat session",
      });
      return res
        .status(401)
        .json(formatNotification("Authentication required", "error"));
    }

    const user = req.user as IUser;
    const { sessionId } = req.params;
    const updates = req.body as IChatSessionUpdate;

    if (!sessionId) {
      log({ type: "error", message: "Session ID is required" });
      return res
        .status(400)
        .json(formatNotification("Session ID is required", "error"));
    }

    const session = await ChatSession.findOne({ sessionId, userId: user._id });

    if (!session) {
      log({ type: "error", message: `Chat session not found: ${sessionId}` });
      return res
        .status(404)
        .json(formatNotification("Chat session not found", "error"));
    }

    // Generate shareId if session is being shared and doesn't have one
    if (updates.isShared && !session.shareId) {
      updates.shareId = `share_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    }

    // Remove shareId if session is being unshared
    if (updates.isShared === false) {
      updates.shareId = undefined;
    }

    Object.assign(session, updates);
    await session.save();

    log({ type: "success", message: `Chat session updated: ${sessionId}` });

    // Add message count to the response
    const sessionWithCount = {
      ...session.toObject(),
      messageCount: session.messages ? session.messages.length : 0,
    };

    res.json({
      ...formatNotification("Chat session updated successfully", "success"),
      session: sessionWithCount,
    });
  } catch (err) {
    log({ type: "error", message: "Failed to update chat session", meta: err });
    next(err);
  }
};

export default updateChatSession;
