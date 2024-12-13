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

export const ProductValidation = {
  createProductValidation,
};
