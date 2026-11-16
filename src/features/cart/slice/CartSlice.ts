import { createSlice } from "@reduxjs/toolkit";
import { CartItemType, CartResponse, Product } from "../types/Cart.types";

export type cartValuesType = {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: null | string;
  data: {
    products: CartItemType[];
    totalCartPrice: number;
  };
};
const cartInitialValues: cartValuesType = {
  status: "",
  message: "",
  numOfCartItems: 0,
  cartId: null,
  data: {
    products: [],
    totalCartPrice: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialValues,
  reducers: {},
});

export const cartReducer = cartSlice.reducer;
