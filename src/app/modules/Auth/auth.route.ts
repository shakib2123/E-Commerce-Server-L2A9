import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidations.registerUserValidationSchema),
  AuthController.registerUser
);

export const AuthRoutes = router;
