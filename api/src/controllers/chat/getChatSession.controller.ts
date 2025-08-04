import { Request, Response, NextFunction } from "express";
import ChatSession from "../../models/chatSession.model";
import { log, formatNotification } from "../../utils/logging/logger";
import type { IUser } from "../../types/user.types";

const getChatSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      log({ type: "error", message: "Session ID is required" });
      return res
        .status(400)
        .json(formatNotification("Session ID is required", "error"));
    }

    // Validate sessionId format
    if (typeof sessionId !== "string" || sessionId.trim().length === 0) {
      log({
        type: "error",
        message: `Invalid session ID format: ${sessionId}`,
      });
      return res
        .status(400)
        .json(formatNotification("Invalid session ID format", "error"));
    }

    let session = null;

    // If user is authenticated, try to find by sessionId and userId first (for owned sessions)
    if (req.isAuthenticated?.() && req.user) {
      const user = req.user as IUser;
      session = await ChatSession.findOne({ sessionId, userId: user._id });
    }

    // If not found as owned session, try to find by shareId (for shared sessions)
    if (!session) {
      session = await ChatSession.findOne({
        shareId: sessionId,
        isShared: true,
      });
    }

    if (!session) {
      log({ type: "error", message: `Chat session not found: ${sessionId}` });
      return res
        .status(404)
        .json(formatNotification("Chat session not found", "error"));
    }

    // Validate session structure
    if (!session.sessionId) {
      log({
        type: "error",
        message: `Chat session has invalid structure: ${sessionId}`,
      });
      return res
        .status(404)
        .json(formatNotification("Chat session data is corrupted", "error"));
    }

    // Access control: If session is not shared and user is not the owner, deny access
    if (
      !session.isShared &&
      (!req.user ||
        session.userId.toString() !== (req.user as IUser)._id?.toString())
    ) {
      log({
        type: "error",
        message: `Unauthorized access to chat session: ${sessionId}`,
      });
      return res.status(403).json(formatNotification("Access denied", "error"));
    }

    log({ type: "info", message: `Retrieved chat session: ${sessionId}` });

    // Add message count to the response
    const sessionWithCount = {
      ...session.toObject(),
      messageCount: session.messages ? session.messages.length : 0,
    };

    res.json({ session: sessionWithCount });
  } catch (err) {
    log({ type: "error", message: "Failed to get chat session", meta: err });
    next(err);
  }
};

export default getChatSession;
