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
const updateCategoryIntoDB = async (id: string, payload: Category) => {
  const result = await prisma.category.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  const result = await prisma.category.delete({
    where: { id },
  });

  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
