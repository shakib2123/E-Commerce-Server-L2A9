import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ShopController } from "./shop.controller";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.get("/", auth(UserRole.ADMIN), ShopController.getAllShops);

router.get("/my-shop", auth(UserRole.VENDOR), ShopController.getMyShop);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  ShopController.updateShop
);

router.patch(
  "/update-shop-image/:id",
  multerUpload.single("shopImage"),
  auth(UserRole.VENDOR),
  ShopController.updateShopImage
);

export const ShopRoutes = router;
