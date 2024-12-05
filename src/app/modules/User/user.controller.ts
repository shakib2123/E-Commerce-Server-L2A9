import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import { CustomRequest } from "../../middlewares/auth";
import { UserService } from "./user.service";

const getCurrentUser = catchAsync(async (req: CustomRequest, res: Response) => {
  const user = req.user;
  console.log({ user });

  const result = await UserService.getCurrentUserFromDB(user.email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User retrieved successfully",
    data: result,
  });
});

export const UserController = { getCurrentUser };
