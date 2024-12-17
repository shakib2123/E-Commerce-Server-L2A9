import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ShopServices } from "./shop.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CustomRequest } from "../../middlewares/auth";
import { TImageFile } from "../../interfaces/image.interface";

const getAllShops = catchAsync(async (req: Request, res: Response) => {
  const result = await ShopServices.getAllShopsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shops retrieved successfully",
    data: result,
  });
});

const getShopById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ShopServices.getShopByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop retrieved successfully",
    data: result,
  });
});

const getMyShop = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await ShopServices.getMyShopFromDB(email as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My shop retrieved successfully",
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
const updateShopImage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const file = req.file;

  const result = await ShopServices.updateShopImageIntoDB(
    id,
    file as TImageFile
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop logo updated successfully",
    data: result,
  });
});

const updateShopBannerImage = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const file = req.file;

    const result = await ShopServices.updateShopBannerImageIntoDB(
      id,
      file as TImageFile
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Shop Banner updated successfully",
      data: result,
    });
  }
);

export const ShopController = {
  getAllShops,
  updateShop,
  getMyShop,
  updateShopImage,
  getShopById,
  updateShopBannerImage,
};
