"use server";
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { CartResponse, CartResponseError } from "../types/Cart.types";

export async function getCartItems(): Promise<
  CartResponse | CartResponseError
> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    console.log("no token");

    return {
      status: "fail",
      message: "Not authenticated. Please log in to access your cart.",
    };
  }
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart`,
      method: "GET",
      headers: { token: `${token.value}` },
    };
    const { data } = await axios.request(options);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Something went wrong. Try again later",
    };
  }
}
export async function addCartItem(
  prodID: string,
): Promise<CartResponse | CartResponseError> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    console.log("no token");

    return {
      status: "fail",
      message: "Not authenticated. Please log in to access your cart.",
    };
  }
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart`,
      method: "POST",
      headers: { token: `${token.value}`, "Content-Type": "application/json" },
      data: {
        productId: `${prodID}`,
      },
    };
    const { data } = await axios.request(options);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Something went wrong. Try again later",
    };
  }
}

export async function clearCart(): Promise<CartResponse | CartResponseError> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    console.log("no token");
    return {
      status: "fail",
      message: "Not authenticated. Please log in to access your cart.",
    };
  }
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart`,
      method: "DELETE",
      headers: { token: `${token.value}` },
    };
    const { data } = await axios.request(options);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Something went wrong. Try again later",
    };
  }
}
export async function removeCartItem(
  prodID: string,
): Promise<CartResponse | CartResponseError> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    console.log("no token");
    return {
      status: "fail",
      message: "Not authenticated. Please log in to access your cart.",
    };
  }
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart/${prodID}`,
      method: "DELETE",
      headers: { token: `${token.value}` },
    };
    const { data } = await axios.request(options);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Something went wrong. Try again later",
    };
  }
}
