import { Router } from "express";
import { ensureAuthenticated } from "./auth.routes";
import { ensureAdmin, ensureSuperadmin } from "../auth/role.middleware";
import updateUserRole from "../controllers/user/updateUserRole.controller";
import { asyncHandler } from "../utils/handlers/asyncHandler";
import User from "../models/user.model";

const router = Router();

router.use(ensureAuthenticated);

// Superadmin: promote/demote any user (user <-> admin <-> superadmin)
router.put("/:id/role", ensureSuperadmin, asyncHandler(updateUserRole));

// GET all users (admin/superadmin only): name, email, role
router.get(
  "/",
  ensureAdmin,
  asyncHandler(async (_req, res) => {
    const users = await User.find({}, "_id name email role username");
    res.json({ users });
  })
);

export default router;
