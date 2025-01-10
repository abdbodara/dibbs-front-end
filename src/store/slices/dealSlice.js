import api from "@/app/util/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ page, searchTerm }) => {
    try {
      const response = await api.get(`/deal`, {
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

export const fetchStoreProducts = createAsyncThunk(
  "product/fetchStoreProducts",
  async ({ userId, page, searchTerm }) => {
    try {
      const response = await api.get(`/deal/user/${userId}`, {
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

export const searchImages = createAsyncThunk(
  "product/searchImages",
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos/?client_id=u6GD0XvKYWCrDk3G5OC1lsXW8XBFfUx4Ejf5dZTKb1s&page=${page}&per_page=10&query=${query}`
      );
      const data = await response.json();
      if (!data || !data.results) {
        throw new Error("No images found");
      }
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch images");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId) => {
    try {
      const response = await api.delete(`/deal/${productId}`);
      if (!response || response.status !== 200) {
        throw new Error("Failed to delete product");
      }
      return productId;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchPendingDeals = createAsyncThunk(
  "product/fetchPendingDeals",
  async ({ page, searchTerm }) => {
    try {
      const response = await api.get(`/deal/pending`, {
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
export const deleteSearchImage = createAsyncThunk(
  "product/deleteImage",
  async (imageId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/deal/product-images/${imageId}`);
      if (!response || response.status !== 200) {
        throw new Error("Failed to delete image");
      }
      return imageId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete image");
    }
  }
);

export const updateProductStatus = createAsyncThunk(
  "product/updateProductStatus",
  async ({ productId, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/deal/products/status/${productId}`, {
        status: status,
      });

      if (!response || response.status !== 200) {
        throw new Error("Failed to update product status");
      }

      return { productId, status };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update status");
    }
  }
);

export const fetchProductVariants = createAsyncThunk(
  "product/fetchProductVariants",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/deal/product-variants/${productId}`);
      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch product variants");
      }
      return { productId, variants: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch variants"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ productData, variationsData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const productFields = {
        product_name: productData.product_name,
        description: productData.description,
        category: productData.category,
        owner_share: productData.owner_share,
        end_date_time: productData.end_date_time,
        end_time: productData.end_time,
        return_policy: productData.return_policy,
        purchase_valid: productData.purchase_valid,
        per_person_purchase: productData.per_person_purchase,
        appointment: productData.appointment,
        status: productData.status,
      };

      for (const key in productFields) {
        if (productFields[key] !== undefined && productFields[key] !== null) {
          formData.append(key, productFields[key]);
        }
      }
      if (Array.isArray(productData.uploadedImages)) {
        productData.uploadedImages.forEach((image, index) => {
          formData.append(`uploadedImages[${index}]`, image.image || image);
        });
      }

      variationsData.forEach((variant, index) => {
        const variantFields = {
          [`variants[${index}]variantId`]: variant.auto_id,
          [`variants[${index}]variant_name`]: variant.name,
          [`variants[${index}]product_price`]: variant.price,
          [`variants[${index}]productVariantDiscount`]: variant.discount,
          // [`variants[${index}]productsTags`]: Array.isArray(variant.productsTags)
          //   ? variant.productsTags.join(",")
          //   : variant.productsTags,
        };

        for (const key in variantFields) {
          if (variantFields[key] !== undefined && variantFields[key] !== null) {
            formData.append(key, variantFields[key]);
          }
        }

        if (variant.image) {
          formData.append(`variants[${index}]variant_image`, variant.image);
        }
      });

      for (let pair of formData.entries()) {
      }

      const response = await api.post(`deal/addDeal`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!response || response.status !== 200) {
        throw new Error("Failed to update product and variants");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ productId, productData, variationsData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const productFields = {
        product_name: productData.product_name,
        description: productData.description,
        category: productData.category,
        owner_share: productData.owner_share,
        end_date_time: productData.end_date_time,
        end_time: productData.end_time,
        return_policy: productData.return_policy,
        purchase_valid: productData.purchase_valid,
        per_person_purchase: productData.per_person_purchase,
        appointment: productData.appointment,
        status: productData.status,
      };
      for (const key in productFields) {
        if (productFields[key] !== undefined && productFields[key] !== null) {
          formData.append(key, productFields[key]);
        }
      }
      if (Array.isArray(productData.uploadedImages)) {
        productData.uploadedImages.forEach((image, index) => {
          formData.append(`uploadedImages[${index}]`, image.image || image);
        });
        // if (image.auto_id) {
        //   formData.append(`uploadedImages[${index}][auto_id]`, image.auto_id);
        // }
      }

      variationsData.forEach((variant, index) => {
        const variantFields = {
          [`variants[${index}]variantId`]: variant.auto_id,
          [`variants[${index}]variant_name`]: variant.name,
          [`variants[${index}]product_price`]: variant.price,
          [`variants[${index}]discount`]: variant.discount,
          [`variants[${index}]productsTags`]: Array.isArray(variant.tags)
            ? variant.tags.join(",")
            : variant.tags,
        };

        for (const key in variantFields) {
          if (variantFields[key] !== undefined && variantFields[key] !== null) {
            formData.append(key, variantFields[key]);
          }
        }

        if (variant.image) {
          formData.append(`variants[${index}]variant_image`, variant.image);
        }
      });

      for (let pair of formData.entries()) {
      }

      const response = await api.patch(`/deal/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!response || response.status !== 200) {
        throw new Error("Failed to update product and variants");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update product"
      );
    }
  }
);

export const uploadImageUrl = createAsyncThunk(
  "product/uploadImageUrl",
  async ({ productId, imageUrl }, { rejectWithValue }) => {
    try {
      const response = await api.post("/deal/saveSearchImage", {
        productId,
        imageUrl,
      });

      if (!response || response.status !== 200) {
        throw new Error("Failed to save image URL");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to save image URL"
      );
    }
  }
);
export const fetchProductImages = createAsyncThunk(
  "product/fetchProductImages",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/deal/product-images/${productId}`);
      if (!response || !response.data) {
        throw new Error("No images found");
      }
      return response.data; // Assuming the response contains the image data
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch product images");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    productData: [],
    variants: {},
    searchImage: [],
    image: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearImages(state) {
      state.image = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductImages.fulfilled, (state, action) => {
        state.loading = false;
        state.searchImage = action.payload.images;
      })
      .addCase(fetchProductImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStoreProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStoreProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
      })
      .addCase(fetchStoreProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPendingDeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPendingDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductVariants.fulfilled, (state, action) => {
        const { productId, variants } = action.payload;
        state.variants[productId] = variants;
      })
      .addCase(fetchProductVariants.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(searchImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.image = action.payload;
      })
      .addCase(searchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearImages } = productSlice.actions;

export default productSlice.reducer;
