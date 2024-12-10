import { Category } from "@prisma/client";
import prisma from "../../utils/prisma";

const createCategoryIntoDB = async (payload: Category) => {
  // console.log(payload);
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await prisma.category.findMany();
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
