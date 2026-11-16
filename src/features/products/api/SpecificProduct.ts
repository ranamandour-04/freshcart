import { AxiosRequestConfig, isAxiosError } from "axios";
import { apiClient } from "@/services/apiClient";
import { Product, ProductApiResponse } from "../types/Products.types";

export async function getSpecificProducts(id: string): Promise<{
  data: Product;
}> {
  const options: AxiosRequestConfig = {
    url: `/products/${id}`,
    method: "GET",
  };
  const { data } = await apiClient.request(options);

  return data;
}
