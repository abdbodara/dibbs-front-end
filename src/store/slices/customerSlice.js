import api from "@/app/util/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustomer = createAsyncThunk(
  "customer/fetchCustomer",
  async ({ page, searchTerm }) => {
    try {
      const response = await api.get(`/customers`, {
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

export const updateCustomerStatus = createAsyncThunk(
  "customer/updateCustomerStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/customers/status/${id}`, { status });
      if (!response || !response.data) {
        throw new Error("No data found");
      }
      fetchCustomer();
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update store status"
      );
    }
  }
);

export const updateCustomerReferelCredit = createAsyncThunk(
  "customer/updateCustomerReferelCredit",
  async ({ customerId, refferal_credits }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/customers/referelcredit/${customerId}`,
        {
          refferal_credits,
        }
      );
      if (!response || !response.data) {
        throw new Error("No data found");
      }
      fetchCustomer();
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update referel credit"
      );
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async ({ customerId }, { rejectWithValue }) => {
    console.log("🚀 ~ customerId:", customerId);
    try {
      const response = await api.delete(
        `/customers/deleteCustomer/${customerId}`
      );
      if (!response || !response.data) {
        throw new Error("No data found");
      }
      fetchCustomer();
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update referel credit"
      );
    }
  }
);

const storesSlice = createSlice({
  name: "customers",
  initialState: {
    data: [],
    loading: false,
    error: null,
    currentPage: 1,
  },
  reducers: {
    setPageNumber: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setPageNumber } = storesSlice.actions;

export default storesSlice.reducer;
