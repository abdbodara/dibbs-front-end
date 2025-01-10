import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/app/util/api";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getProfile = createAsyncThunk("profile/getProfile", async () => {
  try {
    const response = await api.get(`/user/profile`);
    return response.data;
  } catch (error) {
    console.log("Profile fetch error:", error);
    throw error;
  }
});

export const getStoreProfile = createAsyncThunk(
  "profile/getStoreProfile",
  async () => {
    try {
      const response = await api.get(`/user/storeProfile`);
      return response.data;
    } catch (error) {
      console.log("Profile fetch error:", error);
      throw error;
    }
  }
);
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.patch("/user/profile", formData, {
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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  storeProfileData: "",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getStoreProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStoreProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.storeProfileData = action.payload;
        state.error = null;
      })
      .addCase(getStoreProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
