import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryValidations } from "./category.validation";
import { CategoryController } from "./category.controller";

const router = Router();

router.get("/", CategoryController.createCategory);
router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryController.createCategory
);

export const CategoryRoutes = router;
