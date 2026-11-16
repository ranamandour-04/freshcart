import z from "zod";

export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(1, { error: "name is required" })
      .max(25, { error: "name can't be more than 25 character" }),
    email: z
      .string()
      .min(1, { error: "email is required" })
      .pipe(z.email({ error: "email is invalid" })),
    password: z
      .string()
      .min(1, { error: "password is required" })
      .regex(/[A-Z]/, {
        error: "password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        error: "password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        error: "password must contain at least one number",
      })
      .regex(/[!@#$&*_%^]/, {
        error:
          "password must contain at least one of following special characters: (! , @ , # , $ , & , _ )",
      }),
    rePassword: z.string().min(1, { error: "confirm password is required" }),
    phone: z
      .string()
      .min(1, { error: "phone is required" })
      .regex(/^01[0125][0-9]{8}$/, {
        error: "phone must be an egyptian number",
      }),
    terms: z.boolean().refine((data) => data === true, {
      message: "You must accept our Terms and policy",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Password and Confirm password must be the same",
    path: ["rePassword"],
  });

export type SignupFormTypes = z.infer<typeof SignupSchema>;
