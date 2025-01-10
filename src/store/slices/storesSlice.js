import api from "@/app/util/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStores = createAsyncThunk(
  "stores/fetchStores",
  async ({ page, searchTerm }) => {
    try {
      const response = await api.get(`/store`, {
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

export const updateStoreStatus = createAsyncThunk(
  "stores/updateStoreStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/store/${id}`, { status });
      if (!response || !response.data) {
        throw new Error("No data found");
      }
      fetchStores();
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update store status"
      );
    }
  }
);

export const deleteStore = createAsyncThunk(
  "stores/deleteStore",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/store/deleteStore/${id}`);
      if (!response || !response.data) {
        throw new Error("No data found");
      }
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete the store"
      );
    }
  }
);

const storesSlice = createSlice({
  name: "stores",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateStoreStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStoreStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStoreStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default storesSlice.reducer;
