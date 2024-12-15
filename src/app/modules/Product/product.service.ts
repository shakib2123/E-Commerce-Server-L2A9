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
      isDeleted: false,
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

const createDuplicateProduct = async (payload: Product) => {
  const result = await prisma.product.create({ data: payload });

  return result;
};

const getAllProductsFromDB = async () => {
  const result = await prisma.product.findMany({
    include: {
      category: true,
      user: true,
      reviews: true,
      shop: true,
    },
  });

  return result;
};

const getMyProductsFromDB = async (user: User) => {
  const result = await prisma.product.findMany({
    where: {
      userId: user.id,
    },
    include: {
      category: true,
    },
  });

  return result;
};

const getProductByIdFromDB = async (id: string) => {
  const result = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<Product>) => {
  console.log(payload);
  const result = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await prisma.product.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getMyProductsFromDB,
  createDuplicateProduct,
  updateProductIntoDB,
  deleteProductFromDB,
  getProductByIdFromDB,
  getAllProductsFromDB,
};
