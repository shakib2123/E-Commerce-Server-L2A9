import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ProductService } from "./product.service";
import AppError from "../../utils/AppError";
import httpStatus from "http-status";
import { TImageFiles } from "../../interfaces/image.interface";
import sendResponse from "../../utils/sendResponse";
import { CustomRequest } from "../../middlewares/auth";

const createProduct = catchAsync(async (req: CustomRequest, res: Response) => {
  if (!req.files) {
    throw new AppError(httpStatus.BAD_REQUEST, "Please upload an image");
  }

  const user = req.user;

  const result = await ProductService.createProductIntoDB(
    user,
    req.body,
    req.files as TImageFiles
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
};
