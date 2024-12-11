import { UserRole } from "@prisma/client";
import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", auth(UserRole.ADMIN), UserController.getAllUsers);

router.get(
  "/user-data",
  auth(UserRole.USER, UserRole.VENDOR, UserRole.ADMIN),
  UserController.getCurrentUser
);

router.patch(
  "/:id",
  auth(UserRole.USER, UserRole.VENDOR, UserRole.ADMIN),
  UserController.updateUser
);

export const UserRoutes = router;
