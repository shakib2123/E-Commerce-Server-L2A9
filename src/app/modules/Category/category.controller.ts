import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CategoryServices } from "./category.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllCategoriesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Categories retrieved successfully",
    data: result,
  });
});

export const CategoryController = { createCategory, getAllCategories };
