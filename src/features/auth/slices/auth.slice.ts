import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export type User = {
  name: string;
  email?: string;
  id?: string;
  role: string;
};
export type InitialState = {
  isAuthenticated: boolean;
  userInfo: User | null;
};
const initialState: InitialState = { isAuthenticated: false, userInfo: null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: function (state, action) {
      ((state.isAuthenticated = action.payload.isAuthenticated),
        (state.userInfo = action.payload.userInfo));
    },
    logout: function (state) {
      ((state.isAuthenticated = false), (state.userInfo = null));
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
