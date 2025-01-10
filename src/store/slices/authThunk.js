import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/app/util/api";
import { setToken, clearToken } from "./authSlice";
import Cookies from "js-cookie";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("user/login", {
        email,
        password,
      });

      const { token, user_name } = response.data;
      dispatch(setToken({ token, user: user_name }));

      if (rememberMe) {
        Cookies.set("authToken", token, { expires: 7 });
      } else {
        Cookies.set("authToken", token);
      }

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message;
      return rejectWithValue({ message });
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await api.post("user/logout");
    } catch (err) {
      console.log("Logout API failed:", err);
    }
    Cookies.remove("authToken");
    localStorage.removeItem("authToken");
    dispatch(clearToken());
  }
);
