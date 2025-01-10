import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import storesReducer from "./slices/storesSlice";
import ordersReducer from "./slices/orderSlice";
import productReducer from "./slices/dealSlice";
import dashboardReducer from "./slices/dashboardSlice";
import profileReducer from "./slices/profileSlice";
import customerReducer from "./slices/customerSlice";
import categoriesReducer from "./slices/categorySlice";
import faqsReducer from "./slices/faqslice";
import pushNotificationReducer from "./slices/pushNotificationSlice";
import supportQueriesReducer from "./slices/supportQueriesSlice";
import discountCouponsReducer from "./slices/discountCoupon";

const preloadedState = {
  auth: {
    token:
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null,
    user: null,
    role: null,
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stores: storesReducer,
    orders: ordersReducer,
    product: productReducer,
    dashboard: dashboardReducer,
    profile: profileReducer,
    customer: customerReducer,
    categories: categoriesReducer,
    faqs: faqsReducer,
    pushNotification: pushNotificationReducer,
    supportQueries: supportQueriesReducer,
    discountCoupons: discountCouponsReducer,
  },
  preloadedState,
});

export default store;
