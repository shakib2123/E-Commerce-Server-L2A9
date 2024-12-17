import { Prisma, Product, User } from "@prisma/client";
import { TImageFiles } from "../../interfaces/image.interface";
import prisma from "../../utils/prisma";
import AppError from "../../utils/AppError";
import httpStatus from "http-status";
import { productSearchAbleFields } from "./product.constant";

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

const getAllProductsFromDB = async (params: any) => {
  const { searchTerm, minPrice, maxPrice, ...filterData } = params;

  const andCondition: Prisma.ProductWhereInput[] = [];

  if (searchTerm) {
    andCondition.push({
      OR: productSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: (filterData as any)[key],
      })),
    });
  }

  if (minPrice) {
    andCondition.push({
      price: {
        gte: Number(minPrice),
      },
    });
  }

  if (maxPrice) {
    andCondition.push({
      price: {
        lte: Number(maxPrice),
      },
    });
  }

  const result = await prisma.product.findMany({
    where: {
      AND: andCondition,
    },
    include: {
      category: true,
      user: true,
      reviews: true,
      shop: true,
    },
  });

  return result;
};

const getFlashSaleProductsFromDB = () => {
  const result = prisma.product.findMany({
    where: {
      isFlashSale: true,
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

const getShopProductsFromDB = async (shopId: string) => {
  const result = await prisma.product.findMany({
    where: {
      shopId,
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
    include: {
      orderItem: {
        include: {
          order: true,
        },
      },
      category: true,
      reviews: {
        include: {
          user: true,
        },
      },
      user: true,
      shop: true,
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
  getFlashSaleProductsFromDB,
  getShopProductsFromDB,
};
