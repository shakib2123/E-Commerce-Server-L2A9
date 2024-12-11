import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ShopServices } from "./shop.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllShops = catchAsync(async (req: Request, res: Response) => {
  const result = await ShopServices.getAllShopsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shops retrieved successfully",
    data: result,
  });
});
const updateShop = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ShopServices.updateShopIntoDB(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop updated successfully",
    data: result,
  });
});

export const ShopController = {
  getAllShops,
  updateShop,
};
