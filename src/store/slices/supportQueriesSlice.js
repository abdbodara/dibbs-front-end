import api from "@/app/util/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSupportQueries = createAsyncThunk(
  "supportQueries/fetchSupportQueries",
  async (page) => {
    try {
      const response = await api.get(`/support?page=${page}`);
      if (!response || !response.data) {
        throw new Error("No data found");
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateSupportStatus = createAsyncThunk(
  "supportQueries/updateSupportStatus",
  async ({ support_id, status }) => {
    try {
      const response = await api.patch(`/support/updateStatus/${support_id}`, {
        status,
      });
      if (!response || !response.data) {
        throw new Error("Failed to update status");
      }
      return { support_id, status };
    } catch (error) {
      throw error;
    }
  }
);

const supportQueriesSlice = createSlice({
  name: "supportQueries",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportQueries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSupportQueries.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSupportQueries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default supportQueriesSlice.reducer;
