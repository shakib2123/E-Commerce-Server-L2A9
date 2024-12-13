import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import prisma from "../../utils/prisma";
import { User } from "@prisma/client";

const getAllUsersFromDB = async (status: string) => {
  let filter: any = {};
  if (status !== "all") {
    filter.role = { not: "ADMIN" };
  }

  const result = await prisma.user.findMany({
    where: filter,
  });
  return result;
};

const getCurrentUserFromDB = async (email: string) => {
  const result = await prisma.user.findFirst({ where: { email } });

  if (!result) {
    new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<User>) => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });

  return result;
};

export const UserService = {
  getCurrentUserFromDB,
  getAllUsersFromDB,
  updateUserIntoDB,
};
