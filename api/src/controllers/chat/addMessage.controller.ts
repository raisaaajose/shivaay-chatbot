import { Request, Response, NextFunction } from "express";
import ChatSession from "../../models/chatSession.model";
import { log, formatNotification } from "../../utils/logging/logger";
import type { IUser } from "../../types/user.types";
import type { IMessage } from "../../types/chat.types";

const addMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.isAuthenticated?.() || !req.user) {
      log({ type: "error", message: "Authentication required to add message" });
      return res
        .status(401)
        .json(formatNotification("Authentication required", "error"));
    }

    const user = req.user as IUser;
    const { sessionId } = req.params;
    const { message } = req.body as { message: IMessage };

    if (!sessionId || !message) {
      log({ type: "error", message: "Session ID and message are required" });
      return res
        .status(400)
        .json(
          formatNotification("Session ID and message are required", "error")
        );
    }

    const session = await ChatSession.findOne({ sessionId, userId: user._id });

    if (!session) {
      log({ type: "error", message: `Chat session not found: ${sessionId}` });
      return res
        .status(404)
        .json(formatNotification("Chat session not found", "error"));
    }

    session.messages.push(message);
    session.lastActivity = new Date();

    if (
      session.title === "New Chat" &&
      message.sender === "user" &&
      session.messages.length <= 2
    ) {
      session.title =
        message.content.substring(0, 50) +
        (message.content.length > 50 ? "..." : "");
    }

    await session.save();

    log({ type: "success", message: `Message added to session: ${sessionId}` });

    const sessionWithCount = {
      ...session.toObject(),
      messageCount: session.messages ? session.messages.length : 0,
    };

    res.json({
      ...formatNotification("Message added successfully", "success"),
      session: sessionWithCount,
    });
  } catch (err) {
    log({ type: "error", message: "Failed to add message", meta: err });
    next(err);
  }
};

export default addMessage;
