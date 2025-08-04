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
      const chatSession = await (
        await import("../models/chatSession.model")
      ).default.findOne({ shareId, isShared: true });

      if (!chatSession) {
        return res
          .status(404)
          .json({ message: "Shared session not found or no longer available" });
      }

      res.json({ session: chatSession });
    } catch (error) {
      next(error);
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
