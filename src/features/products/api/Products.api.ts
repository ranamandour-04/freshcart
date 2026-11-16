import { AxiosRequestConfig, isAxiosError } from "axios";
import { apiClient } from "@/services/apiClient";
import { Product } from "../types/Products.types";

export async function getFeaturedProducts(): Promise<{
  success: boolean;
  message: string;
  featured?: Product[];
}> {
  try {
    const options: AxiosRequestConfig = {
      url: `/products?limit=40&page=1`,
      method: "GET",
    };
    const { data } = await apiClient.request(options);

    return {
      success: true,
      message: "sucessfull request",
      featured: data.data,
    };
  } catch (error) {
    console.log({ error });
    if (isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data.message || "request error",
      };
    }
    return { success: false, message: "something went wrong" };
  }
}
export const featuredProducts = await getFeaturedProducts();
