import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middlewares/bodyParser";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import { ProductController } from "./product.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/",
  auth(UserRole.VENDOR),
  multerUpload.fields([{ name: "productImages" }]),
  parseBody,
  validateRequest(ProductValidation.createProductValidation),
  ProductController.createProduct
);

export const ProductRoutes = router;
