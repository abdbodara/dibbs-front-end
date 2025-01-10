import api from "@/app/util/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPushNotification = createAsyncThunk(
  "pushNotification/fetchPushNotification",
  async (page) => {
    try {
      const response = await api.get(`/pushNotification?page=${page}`);
      if (!response || !response.data) {
        throw new Error("No data found");
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deletePushNotification = createAsyncThunk(
  "pushNotification/fetchPushNotification",
  async (pushNotificationId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/pushNotification/deleteNotification/${pushNotificationId}`
      );
      if (!response || !response.data) {
        throw new Error("Failed to delete push notification");
      }
      return pushNotificationId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete push notification"
      );
    }
  }
);

const faqSlice = createSlice({
  name: "pushNotification",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPushNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPushNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPushNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default faqSlice.reducer;
