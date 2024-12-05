import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import prisma from "../../utils/prisma";

const getCurrentUserFromDB = async (email: string) => {
  const result = await prisma.user.findFirst({ where: { email } });

  if (!result) {
    new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  return result;
};

export const UserService = { getCurrentUserFromDB };
