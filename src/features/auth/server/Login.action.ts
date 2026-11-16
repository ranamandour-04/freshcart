"use server";

import z, { success } from "zod";
import { LoginFormTypes, LoginSchema } from "../schemas/LoginSchema";
import { AxiosRequestConfig, isAxiosError } from "axios";
import { apiClient } from "@/services/apiClient";
type LoginfieldErrorsType = Partial<Record<keyof LoginFormTypes, string[]>>;
type LoginResponse = {
  message: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
};
type LoginActionReturntype =
  | { success: true; message: string; data: LoginResponse }
  | { success: false; message: string; fieldErrors?: LoginfieldErrorsType };
export default async function LoginAction(
  values: LoginFormTypes,
): Promise<LoginActionReturntype> {
  const validationResult = LoginSchema.safeParse(values);

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
      url: "/auth/signin",
      method: "POST",
      data: values,
    };
    const { data } = await apiClient.request(options);
    // console.log(data.token);
    // const token = data.token;
    return {
      success: true,
      message: "Logged in sucessfully",
      data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data.message ||
          `couldn't reach server. Please try again`,
      };
    }
    return {
      success: false,
      message: `something went wrong. Please try again`,
    };
  }
}
