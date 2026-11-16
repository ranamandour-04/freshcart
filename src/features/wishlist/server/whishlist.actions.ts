"use server";
import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { Product } from "@/features/products/types/Products.types";
import { cookies } from "next/headers";

export interface WishlistResponse {
  status: string;
  count: number;
  data: Product[];
}

export interface WishlistActionResponse {
  status: string;
  message: string;
  data: string[]; // List of product IDs in wishlist
}

// 1. GET: Get logged user wishlist
export async function getLoggedUserWishlist(): Promise<WishlistResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const options: AxiosRequestConfig = {
    url: "/wishlist",
    method: "GET",
    headers: { token: `${token?.value}` },
  };
  const response = await apiClient.request(options);
  return response.data;
}

// 2. POST: Add product to wishlist
export async function addProductToWishlist(
  productId: string,
): Promise<WishlistActionResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const options: AxiosRequestConfig = {
    url: "/wishlist",
    method: "POST",
    headers: { token: `${token?.value}` },

    data: { productId },
  };
  const response = await apiClient.request<WishlistActionResponse>(options);
  return response.data;
}

// 3. DELETE: Remove product from wishlist
export async function removeProductFromWishlist(
  productId: string,
): Promise<WishlistActionResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const options: AxiosRequestConfig = {
    url: `/wishlist/${productId}`,
    method: "DELETE",
    headers: { token: `${token?.value}` },
  };
  const response = await apiClient.request<WishlistActionResponse>(options);
  return response.data;
}
