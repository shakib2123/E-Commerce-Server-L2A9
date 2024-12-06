import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import { createToken } from "../../utils/jwtHelpers";
import config from "../../config";
import prisma from "../../utils/prisma";

import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { isPasswordMatched } from "./auth.utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail";

const registerUser = async (payload: User) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user is already exist !");
  }

  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_round)
  );

  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    role: payload.role,
  };

  let result;

  if (payload.role === "VENDOR") {
    await prisma.$transaction(async (transactionClient) => {
      result = await transactionClient.user.create({
        data: userData,
      });
      await transactionClient.shop.create({
        data: {
          email: payload.email,
        },
      });
    });
  } else {
    result = await prisma.user.create({
      data: userData,
    });
  }

  if (!result) {
    throw new Error("Something went wrong");
  }

  const jwtPayload = {
    id: result.id,
    name: result.name,
    email: result.email,
    role: result.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  const { password, ...userInfo } = result;

  return { user: userInfo, accessToken, refreshToken };
};

const loginUser = async (payload: Partial<User>) => {
  const lastLogin = new Date(Date.now()).toISOString();

  const user = await prisma.user.update({
    where: { email: payload.email },
    data: {
      lastLogin,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user is blocked !");
  }
  if (user.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user is deleted !");
  }

  const passwordMatch = await isPasswordMatched(
    payload?.password as string,
    user?.password
  );

  if (!passwordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password not matched");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  const { password, ...userData } = user;

  return { user: userData, accessToken, refreshToken };
};

const forgotPassword = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email, isDeleted: false, isBlocked: false },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found !");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const resetToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "20m",
  });

  const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`;
  sendEmail(user.email, resetUILink);
};

const resetPassword = async (payload: {
  id: string;
  newPassword: string;
  token: string;
}) => {
  const user = await prisma.user.findUnique({ where: { id: payload.id } });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found !");
  }

  const decoded = jwt.verify(
    payload.token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  if (!decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  if (user.email !== decoded.email || user.role !== decoded.role) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  // hash password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round)
  );

  const updatedUser = await prisma.user.update({
    where: {
      email: decoded.email,
      role: decoded.role,
    },
    data: {
      password: newHashedPassword,
    },
  });

  return updatedUser;
};

export const AuthServices = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
