import { Request, Response, NextFunction } from "express";
import ChatSession from "../../models/chatSession.model";
import { log, formatNotification } from "../../utils/logging/logger";
import type { IUser } from "../../types/user.types";

const getChatSessions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.isAuthenticated?.() || !req.user) {
      log({
        type: "error",
        message: "Authentication required to get chat sessions",
      });
      return res
        .status(401)
        .json(formatNotification("Authentication required", "error"));
    }

    const user = req.user as IUser;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const sessions = await ChatSession.find({ userId: user._id })
      .select("sessionId title lastActivity createdAt isShared shareId")
      .sort({ lastActivity: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    // Get message counts using aggregation for better performance
    const sessionIds = sessions.map((session) => session.sessionId);
    const messageCounts = await ChatSession.aggregate([
      { $match: { sessionId: { $in: sessionIds } } },
      {
        $project: {
          sessionId: 1,
          messageCount: { $size: "$messages" },
        },
      },
    ]);

    const messageCountMap = new Map(
      messageCounts.map((item) => [item.sessionId, item.messageCount])
    );

    const sessionsWithCount = sessions.map((session) => ({
      ...session,
      messageCount: messageCountMap.get(session.sessionId) || 0,
      messages: [], // Don't send full messages in list view for performance
    }));

    const total = await ChatSession.countDocuments({ userId: user._id });

    log({
      type: "info",
      message: `Retrieved ${sessionsWithCount.length} chat sessions for user ${user._id}`,
    });
    res.json({
      sessions: sessionsWithCount,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    log({ type: "error", message: "Failed to get chat sessions", meta: err });
    next(err);
  }
};

export default getChatSessions;
