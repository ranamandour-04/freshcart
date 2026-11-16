"use server";
import { apiClient } from "@/services/apiClient";
import axios, { AxiosRequestConfig } from "axios";
import {
  CashOrderResponse,
  ShippingAddressPayload,
} from "../types/checkout.types";
import { cookies } from "next/headers";

export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddressPayload,
): Promise<CashOrderResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const options: AxiosRequestConfig = {
    url: `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
    method: "POST",
    headers: { token: `${token?.value}`, "Content-Type": "application/json" },
    data: {
      shippingAddress,
    },
  };
  const response = await axios.request(options);
  return response.data;
}
