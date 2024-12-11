import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ShopController } from "./shop.controller";

const router = Router();

router.get("/", auth(UserRole.ADMIN), ShopController.getAllShops);

router.patch("/:id", auth(UserRole.ADMIN), ShopController.updateShop);

export const ShopRoutes = router;
