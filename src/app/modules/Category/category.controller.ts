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
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories retrieved successfully",
    data: result,
  });
});
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await CategoryServices.updateCategoryIntoDB(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
};
