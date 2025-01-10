import api from "@/app/util/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async ({ page, searchTerm }) => {
    try {
      const response = await api.get(`/order`, {
        params: { page, searchTerm },
      });
      if (!response || !response.data) {
        throw new Error("No data found");
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchStoreOrders = createAsyncThunk(
  "order/fetchStoreOrders",
  async ({ userId, page, searchTerm }) => {
    try {
      const response = await api.get(`/order/user/${userId}`, {
        params: { page, searchTerm },
      });
      if (!response || !response.data) {
        throw new Error("No data found");
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId) => {
    try {
      const response = await api.put(`/order/cancel/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchOrderVariants = createAsyncThunk(
  "order/fetchOrderVariants",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/order/${orderId}`);
      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch product variants");
      }
      return { orderId, variants: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch variants"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    data: [],
    storeData: [],
    variants: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStoreOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStoreOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.storeData = action.payload;
      })
      .addCase(fetchStoreOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderVariants.fulfilled, (state, action) => {
        const { orderId, variants } = action.payload;
        state.variants[orderId] = variants;
      })
      .addCase(fetchOrderVariants.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
