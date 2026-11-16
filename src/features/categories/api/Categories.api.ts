import { AxiosRequestConfig } from "axios";
import { Category } from "../types/CategoriesTypes";
import { apiClient } from "@/services/apiClient";

async function getAllCategories(): Promise<{
  success: boolean;
  message: string;
  categories?: Category[];
}> {
  try {
    const options: AxiosRequestConfig = {
      url: `/categories`,
      method: "GET",
    };
    const response = await apiClient.request(options);

    // console.log("success", response.data.data);
    return { success: true, message: "yess", categories: response.data.data };
  } catch (error) {
    console.log({ error });
    return { success: false, message: "no" };
  }
}
export const allCategories = await getAllCategories();
