import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import { CustomRequest } from "../../middlewares/auth";
import { UserService } from "./user.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.query;

  const result = await UserService.getAllUsersFromDB(status as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getCurrentUser = catchAsync(async (req: CustomRequest, res: Response) => {
  const user = req.user;

  const result = await UserService.getCurrentUserFromDB(user.email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User retrieved successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.updateUserIntoDB(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User retrieved successfully",
    data: result,
  });
});

export const UserController = { getCurrentUser, getAllUsers, updateUser };
