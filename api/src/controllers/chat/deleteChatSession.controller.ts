import { Request, Response, NextFunction } from "express";
import ChatSession from "../../models/chatSession.model";
import { log, formatNotification } from "../../utils/logging/logger";
import type { IUser } from "../../types/user.types";

const deleteChatSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.isAuthenticated?.() || !req.user) {
      log({
        type: "error",
        message: "Authentication required to delete chat session",
      });
      return res
        .status(401)
        .json(formatNotification("Authentication required", "error"));
    }

    const user = req.user as IUser;
    const { sessionId } = req.params;

    if (!sessionId) {
      log({ type: "error", message: "Session ID is required" });
      return res
        .status(400)
        .json(formatNotification("Session ID is required", "error"));
    }

    const session = await ChatSession.findOneAndDelete({
      sessionId,
      userId: user._id,
    });

    if (!session) {
      log({ type: "error", message: `Chat session not found: ${sessionId}` });
      return res
        .status(404)
        .json(formatNotification("Chat session not found", "error"));
    }

    log({ type: "success", message: `Chat session deleted: ${sessionId}` });
    res.json(
      formatNotification("Chat session deleted successfully", "success")
    );
  } catch (err) {
    log({ type: "error", message: "Failed to delete chat session", meta: err });
    next(err);
  }
};

export default deleteChatSession;
