import { Request, Response } from "express";
import ChatSession from "../../models/chatSession.model";
import User from "../../models/user.model";
import { log, formatNotification } from "../../utils/logging/logger";
import type { IUser } from "../../types/user.types";

const getUserStats = async (req: Request, res: Response) => {
  try {
    if (!req.isAuthenticated?.() || !req.user) {
      log({
        type: "error",
        message: "Authentication required to get user stats",
      });
      return res
        .status(401)
        .json(formatNotification("Authentication required", "error"));
    }

    const user = req.user as IUser;
    const userId = user._id;

    // Get total conversations count
    const totalConversations = await ChatSession.countDocuments({ userId });

    // Get days active (days since account creation)
    const userDoc = await User.findById(userId);
    const accountCreatedAt = (userDoc as any)?.createdAt || new Date();
    const daysActive = Math.ceil(
      (Date.now() - accountCreatedAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Get total messages sent by user
    const userMessageStats = await ChatSession.aggregate([
      { $match: { userId: userId } },
      { $unwind: "$messages" },
      { $match: { "messages.sender": "user" } },
      { $count: "totalUserMessages" },
    ]);

    const totalUserMessages = userMessageStats[0]?.totalUserMessages || 0;

    // Get member since date
    const memberSince = accountCreatedAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });

    // Get account type based on role
    const accountType =
      user.role === "admin"
        ? "Admin"
        : user.role === "superadmin"
        ? "Super Admin"
        : "Premium"; // Default to Premium for regular users

    res.json({
      stats: {
        totalConversations,
        daysActive,
        totalUserMessages,
        memberSince,
        accountType,
        status: "Active",
      },
    });
  } catch (error) {
    log({
      type: "error",
      message: `Error getting user stats: ${error}`,
      meta: { userId: (req.user as any)?._id, error },
    });
    res
      .status(500)
      .json(formatNotification("Failed to get user statistics", "error"));
  }
};

export default getUserStats;
