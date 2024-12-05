import { UserRole } from "@prisma/client";
import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserController } from "./user.controller";

const router = Router();

router.get(
  "/user-data",
  auth(UserRole.USER, UserRole.VENDOR, UserRole.ADMIN),
  UserController.getCurrentUser
);

export const UserRoutes = router;
