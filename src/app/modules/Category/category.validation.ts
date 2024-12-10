import { z } from "zod";

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    }),
    description: z.string().optional(),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Title must be a string",
      })
      .optional(),
    description: z
      .string({ invalid_type_error: "Description must be a string" })
      .optional(),
  }),
});

export const CategoryValidations = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
