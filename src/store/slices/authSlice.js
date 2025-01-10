import api from "@/app/util/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/user/reset-password?token=${token}`, {
        password,
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message;
      return rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/forgot-password", { email });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message;
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { user_name, email, pwd, confirmPassword, store_name },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/user/register", {
        user_name,
        email,
        pwd,
        confirmPassword,
        store_name,
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      return rejectWithValue(message);
    }
  }
);

export const updateStoreProfile = createAsyncThunk(
  "auth/updateStoreProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.patch("/user/updateStoreProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      return rejectWithValue(message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    role: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(resetPassword.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(resetPassword.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.successMessage = action.payload.message;
  //     })
  //     .addCase(resetPassword.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     });

  //   // builder
  //   //   .addCase(forgotPassword.pending, (state) => {
  //   //     state.loading = true;
  //   //     state.error = null;
  //   //   })
  //   //   .addCase(forgotPassword.fulfilled, (state, action) => {
  //   //     state.loading = false;
  //   //     state.successMessage = action.payload.message;
  //   //   })
  //   //   .addCase(forgotPassword.rejected, (state, action) => {
  //   //     state.loading = false;
  //   //     state.error = action.payload;
  //   //   });
  // },
});

export const selectAuth = (state) => state.auth;

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
