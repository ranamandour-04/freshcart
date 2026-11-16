"use server";

import { AxiosRequestConfig, isAxiosError } from "axios";
import z from "zod";
import { SignupFormTypes, SignupSchema } from "../schemas/SignupSchema";
import { apiClient } from "@/services/apiClient";

type signupFieldErrorsType = Partial<Record<keyof SignupFormTypes, string[]>>;
type signupActionReturn =
  | { success: true; message: string }
  | { success: false; message: string; fieldErrors?: signupFieldErrorsType };

export default async function signupAction(
  values: SignupFormTypes,
): Promise<signupActionReturn> {
  const validationResult = SignupSchema.safeParse(values);
  if (validationResult.success === false) {
    const { formErrors, fieldErrors } = z.flattenError(validationResult.error);
    return {
      success: false,
      message: formErrors[0] ?? "fix highlighted errors",
      fieldErrors,
    };
  }
  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `/auth/signup`,
      data: values,
    };
    await apiClient.request(options);
    return { success: true, message: `account created successfully` };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data.message ??
          `couldn't reach server. Please try again`,
      };
    }
    return {
      success: false,
      message: `something went wrong. Please try again`,
    };
  }
}
