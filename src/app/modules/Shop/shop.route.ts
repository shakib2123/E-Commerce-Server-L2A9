import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ShopController } from "./shop.controller";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.get("/", ShopController.getAllShops);

router.get("/:id", ShopController.getShopById);

router.get("/my-shop/:email", auth(UserRole.VENDOR), ShopController.getMyShop);

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
router.patch(
  "/update-shop-banner-image/:id",
  multerUpload.single("bannerImage"),
  auth(UserRole.VENDOR),
  ShopController.updateShopBannerImage
);

export const ShopRoutes = router;
