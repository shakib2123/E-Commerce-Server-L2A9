import { Shop } from "@prisma/client";
import prisma from "../../utils/prisma";

const getAllShopsFromDB = async () => {
  const result = await prisma.shop.findMany({
    include: {
      user: true,
    },
  });

  return result;
};

const updateShopIntoDB = async (id: string, payload: Partial<Shop>) => {
  const result = await prisma.shop.update({
    where: { id },
    data: payload,
  });

  return result;
};

export const ShopServices = {
  getAllShopsFromDB,
  updateShopIntoDB,
};
