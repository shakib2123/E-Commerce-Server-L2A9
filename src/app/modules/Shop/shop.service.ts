import { Shop } from "@prisma/client";
import prisma from "../../utils/prisma";
import { TImageFile } from "../../interfaces/image.interface";

const getAllShopsFromDB = async () => {
  const result = await prisma.shop.findMany({
    include: {
      user: true,
    },
  });

  return result;
};

const getShopByIdFromDB = async (id: string) => {
  const result = await prisma.shop.findUnique({
    where: {
      id,
    },
    include: {
      followedShop: true,
      user: true,
      order: true,
      product: true,
    },
  });

  return result;
};

const getMyShopFromDB = async (email: string) => {
  const result = await prisma.shop.findUnique({
    where: {
      email,
    },
    include: {
      followedShop: true,
      user: true,
      order: true,
      product: true,
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
const updateShopImageIntoDB = async (id: string, file: TImageFile) => {
  const result = await prisma.shop.update({
    where: { id },
    data: {
      logo: file.path,
    },
  });

  return result;
};
const updateShopBannerImageIntoDB = async (id: string, file: TImageFile) => {
  const result = await prisma.shop.update({
    where: { id },
    data: {
      bannerImage: file.path,
    },
  });

  return result;
};

export const ShopServices = {
  getAllShopsFromDB,
  updateShopIntoDB,
  getShopByIdFromDB,
  getMyShopFromDB,
  updateShopImageIntoDB,
  updateShopBannerImageIntoDB,
};
