import { z } from "zod";

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
    role: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .optional(),
  }),
});
const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
  }),
});

const forgotPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "User email is required",
    }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "id is required",
    }),
    token: z.string({
      required_error: "Token is required",
    }),
    newPassword: z.string({
      required_error: "New Password is required",
    }),
  }),
});

export const AuthValidations = {
  registerUserValidationSchema,
  loginUserValidationSchema,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
};
