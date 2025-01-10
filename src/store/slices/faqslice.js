import api from "@/app/util/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFaqs = createAsyncThunk(
  "faqs/fetchFaqs",
  async (page) => {
    try {
      const response = await api.get(`/faqs?page=${page}`);
      if (!response || !response.data) {
        throw new Error("No data found");
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteFaqs = createAsyncThunk(
  "faqs/fetchFaqs",
  async (faqsId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/faqs/deleteFaq/${faqsId}`);
      if (!response || !response.data) {
        throw new Error("Failed to delete category");
      }
      return categoryId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete category"
      );
    }
  }
);

export const addFaq = createAsyncThunk(
  "faqs/addFaq",
  async (faqData, { rejectWithValue }) => {
    try {
      const response = await api.post("/faqs/createFaq", faqData);
      if (!response || !response.data) {
        throw new Error("Failed to add FAQ");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add FAQ");
    }
  }
);

export const updateFaq = createAsyncThunk(
  "faqs/updateFaq",
  async ({ faqId, faqData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/faqs/updateFaq/${faqId}`, faqData);
      if (!response || !response.data) {
        throw new Error("Failed to update FAQ");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update FAQ");
    }
  }
);

const faqSlice = createSlice({
  name: "faqs",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default faqSlice.reducer;
