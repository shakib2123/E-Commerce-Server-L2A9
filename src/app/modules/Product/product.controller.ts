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
const createDuplicateProduct = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductService.createDuplicateProduct(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Product duplicated successfully",
      data: result,
    });
  }
);

const getMyProducts = catchAsync(async (req: CustomRequest, res: Response) => {
  const user = req.user;

  const result = await ProductService.getMyProductsFromDB(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.deleteProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getMyProducts,
  createDuplicateProduct,
  deleteProduct,
};
