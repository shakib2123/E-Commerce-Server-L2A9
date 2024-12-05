import { NextFunction, Request, Response } from "express";

import catchAsync from "../utils/catchAsync";

import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../utils/AppError";
import { UserRole } from "@prisma/client";
import prisma from "../utils/prisma";

export type CustomRequest = Request & { user?: any };

export const auth = (...requiredRoles: (keyof typeof UserRole)[]) => {
  return catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const token = req?.headers?.authorization;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      req.user = verifiedUser;

      const isUserExist = await prisma.user.findUnique({
        where: { email: verifiedUser.email },
      });

      if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
      }

      if (!requiredRoles.includes(verifiedUser.role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      next();
    }
  );
};
