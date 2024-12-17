import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middlewares/bodyParser";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import { ProductController } from "./product.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/", ProductController.getAllProducts);

router.get("/flash-sales", ProductController.getFlashSaleProducts);

router.get(
  "/my-products",
  auth(UserRole.VENDOR),
  ProductController.getMyProducts
);

router.get("/:id", ProductController.getProductById);

router.post(
  "/",
  auth(UserRole.VENDOR),
  multerUpload.fields([{ name: "productImages" }]),
  parseBody,
  validateRequest(ProductValidation.createProductValidation),
  ProductController.createProduct
);

router.post(
  "/create-duplicate-product",
  auth(UserRole.VENDOR),
  validateRequest(ProductValidation.createDuplicateProductValidation),
  ProductController.createDuplicateProduct
);

router.patch(
  "/:id",
  auth(UserRole.VENDOR),
  validateRequest(ProductValidation.updateProductValidation),
  ProductController.updateProduct
);

router.delete("/:id", auth(UserRole.VENDOR), ProductController.deleteProduct);

export const ProductRoutes = router;
