import { Product, User } from "@prisma/client";
import { TImageFiles } from "../../interfaces/image.interface";
import prisma from "../../utils/prisma";
import AppError from "../../utils/AppError";
import httpStatus from "http-status";

const createProductIntoDB = async (
  user: User,
  payload: Product,
  images: TImageFiles
) => {
  const { productImages } = images;
  payload.images = productImages.map((image) => image.path);

  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      shop: true,
    },
  });

  if (!userData || !userData.shop) {
    throw new AppError(httpStatus.NOT_FOUND, "User or shop is not found !");
  }

  const category = await prisma.category.findUnique({
    where: {
      id: payload.categoryId,
    },
  });

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category is not found");
  }

  const result = await prisma.product.create({
    data: {
      name: payload.name,
      description: payload.description,
      price: Number(payload.price),
      discountPrice: Number(payload.discountPrice),
      categoryId: category.id,
      shopId: userData?.shop?.id as string,
      userId: userData?.id,
      inventoryCount: Number(payload.inventoryCount),
      images: payload.images,
    },
  });

  return result;
};

export const ProductService = {
  createProductIntoDB,
};