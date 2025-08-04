import { Router } from "express";
import { ensureAuthenticated } from "./auth.routes";
import { asyncHandler } from "../utils/handlers/asyncHandler";
import createChatSession from "../controllers/chat/createChatSession.controller";
import createChatSessionForAI from "../controllers/chat/createChatSessionForAI.controller";
import getChatSessions from "../controllers/chat/getChatSessions.controller";
import getChatSession from "../controllers/chat/getChatSession.controller";
import updateChatSession from "../controllers/chat/updateChatSession.controller";
import deleteChatSession from "../controllers/chat/deleteChatSession.controller";
import addMessage from "../controllers/chat/addMessage.controller";
import addMessagesBatch from "../controllers/chat/addMessagesBatch.controller";
import addMessagesBatchForAI from "../controllers/chat/addMessagesBatchForAI.controller";
import shareChatSession from "../controllers/chat/shareChatSession.controller";
import unshareChatSession from "../controllers/chat/unshareChatSession.controller";

const router = Router();

// Public routes
router.get(
  "/shared/:shareId",
  asyncHandler(async (req, res, next) => {
    try {
      const { shareId } = req.params;

      // Validate shareId format
      if (
        !shareId ||
        typeof shareId !== "string" ||
        shareId.trim().length === 0
      ) {
        return res.status(400).json({
          message:
            "Invalid share ID: Share link appears to be malformed or incomplete",
          error: "INVALID_SHARE_ID",
        });
      }

      // Check for basic format validation - more restrictive validation
      if (
        shareId.length < 8 ||
        shareId.length > 64 ||
        !/^[a-zA-Z0-9_-]+$/.test(shareId)
      ) {
        return res.status(400).json({
          message:
            "Invalid share ID format: Please check the URL and try again",
          error: "INVALID_SHARE_FORMAT",
        });
      }

      // Additional security check for suspicious patterns
      if (
        shareId.includes("..") ||
        shareId.includes("/") ||
        shareId.includes("\\")
      ) {
        return res.status(400).json({
          message:
            "Invalid share ID format: Potentially unsafe characters detected",
          error: "INVALID_SHARE_FORMAT",
        });
      }

      const chatSession = await (
        await import("../models/chatSession.model")
      ).default
        .findOne({ shareId, isShared: true })
        .select("-userId");

      if (!chatSession) {
        return res.status(404).json({
          message:
            "Shared chat session not found: This session may have been deleted, unshared, or never existed",
          error: "SESSION_NOT_FOUND",
        });
      }

      // Additional validation - ensure session has valid structure
      if (!chatSession.sessionId || !chatSession.messages) {
        return res.status(404).json({
          message: "Chat session data is corrupted or invalid",
          error: "SESSION_CORRUPTED",
        });
      }

      // Remove sensitive data before sending
      const sanitizedSession = {
        ...chatSession.toObject(),
        userId: undefined, // Remove user ID for privacy
      };

      res.json({ session: sanitizedSession });
    } catch (error) {
      // Log the actual error for debugging
      console.error("Error fetching shared session:", error);

      // Return generic error to client
      res.status(500).json({
        message: "Server error occurred while fetching shared session",
        error: "SERVER_ERROR",
      });
    }
  })
);

// AI backend routes (no authentication required)
router.post("/ai/create", asyncHandler(createChatSessionForAI));
router.post(
  "/:sessionId/messages/ai/batch",
  asyncHandler(addMessagesBatchForAI)
);

// Protected routes (require authentication)
router.use(ensureAuthenticated);

// Chat session management
router.post("/", asyncHandler(createChatSession));
router.get("/", asyncHandler(getChatSessions));
router.get("/:sessionId", asyncHandler(getChatSession));
router.put("/:sessionId", asyncHandler(updateChatSession));
router.delete("/:sessionId", asyncHandler(deleteChatSession));

// Share management
router.post("/:sessionId/share", asyncHandler(shareChatSession));
router.delete("/:sessionId/share", asyncHandler(unshareChatSession));

// Message management
router.post("/:sessionId/messages", asyncHandler(addMessage));
router.post("/:sessionId/messages/batch", asyncHandler(addMessagesBatch));

export default router;
