import api from "@/app/util/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async () => {
    try {
      const response = await api.get("/dashboard");
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const fetchStoreDashboardData = createAsyncThunk(
  "dashboard/fetchStoreData",
  async (id) => {
    try {
      const response = await api.get(`/dashboard/user/${id}`);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: [],
    storeData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData?.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStoreDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStoreDashboardData?.fulfilled, (state, action) => {
        state.loading = false;
        state.storeData = action.payload;
      })
      .addCase(fetchStoreDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
