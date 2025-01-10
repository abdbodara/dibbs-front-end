import api from "@/app/util/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDiscountCoupon = createAsyncThunk(
  "coupons/fetchDiscountCoupon",
  async (page) => {
    try {
      const response = await api.get(`/coupon?page=${page}`);
      if (!response || !response.data) {
        throw new Error("No data found");
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (couponData, { rejectWithValue }) => {
    try {
      const response = await api.post("/coupon/createCoupons", couponData);
      if (!response.data) {
        throw new Error("Failed to create coupon");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const DeleteDiscountCoupon = createAsyncThunk(
  "coupons/fetchDiscountCoupon",
  async (couponId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/coupon/deleteCoupons/${couponId}`);
      if (!response || !response.data) {
        throw new Error("No data found");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete discountCoupon"
      );
    }
  }
);

const discountCouponSlice = createSlice({
  name: "stores",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscountCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiscountCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDiscountCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default discountCouponSlice.reducer;
