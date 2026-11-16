import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { Brand } from "../types/Brands.types";

async function getAllBrands(): Promise<{ success: boolean; brands?: Brand[] }> {
  try {
    const options: AxiosRequestConfig = {
      url: `/brands`,
      method: "GET",
    };
    const { data } = await apiClient.request(options);
    return {
      success: true,
      brands: data.data,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}

export const allBrands =await getAllBrands();
