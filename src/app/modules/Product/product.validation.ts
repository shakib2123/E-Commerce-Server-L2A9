import { z } from "zod";

const createProductValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Product name is required" }),
    description: z.string({
      required_error: "Product description is required",
    }),
    price: z.string({ required_error: "Product price is required" }),
    discountPrice: z.string({
      required_error: "Product discount price is required",
    }),
    categoryId: z.string({ required_error: "Product category is required" }),
    inventoryCount: z.string({
      required_error: "Product inventory count is required",
    }),
  }),
});

const createDuplicateProductValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Product name is required" }),
    description: z.string({
      required_error: "Product description is required",
    }),
    price: z.number({ required_error: "Product price is required" }),
    discountPrice: z.number({
      required_error: "Product discount price is required",
    }),
    categoryId: z.string({ required_error: "Product category is required" }),
    shopId: z.string({ required_error: "Product shop Id is required" }),
    userId: z.string({ required_error: "Product user Id is required" }),
    inventoryCount: z.number({
      required_error: "Product inventory count is required",
    }),
    images: z.array(z.string()),
  }),
});

const updateProductValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Product name is required" }).optional(),
    description: z
      .string({
        required_error: "Product description is required",
      })
      .optional(),
    price: z.number({ required_error: "Product price is required" }).optional(),
    discountPrice: z
      .number({
        required_error: "Product discount price is required",
      })
      .optional(),
    categoryId: z
      .string({ required_error: "Product category is required" })
      .optional(),
    shopId: z
      .string({ required_error: "Product shop Id is required" })
      .optional(),
    userId: z
      .string({ required_error: "Product user Id is required" })
      .optional(),
    inventoryCount: z
      .number({
        required_error: "Product inventory count is required",
      })
      .optional(),
    images: z.array(z.string()).optional(),
    isFlashSale: z.boolean().optional(),
    flashSalePrice: z.number().optional(),
  }),
});

export const ProductValidation = {
  createProductValidation,
  createDuplicateProductValidation,
  updateProductValidation,
};
