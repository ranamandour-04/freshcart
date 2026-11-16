import { AxiosRequestConfig } from "axios";
import { apiClient } from "@/services/apiClient";
import { Product } from "../types/Products.types";

export async function getRelatedProducts(id: string): Promise<{
  data: Product[];
}> {
  const options: AxiosRequestConfig = {
    url: `/products?limit=10&category[in]=${id}`,
    method: "GET",
  };
  const { data } = await apiClient.request(options);
  return data;
}
// export const featuredProducts = await getRelatedProducts();
