import { authReducer, InitialState } from "@/features/auth/slices/auth.slice";
import { cartReducer, cartValuesType } from "@/features/cart/slice/CartSlice";
import { configureStore } from "@reduxjs/toolkit";

export type preloadedStateType = {
  authReducer: InitialState;
  cartReducer: cartValuesType;
};
export function createStore(preloadedState: preloadedStateType) {
  const myStore = configureStore({
    reducer: {
      authReducer,
      cartReducer,
    },
    preloadedState,
  });
  return myStore;
}
export type appStore = ReturnType<typeof createStore>;
export type appStateType = ReturnType<appStore["getState"]>;
