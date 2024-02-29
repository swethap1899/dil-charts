import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderData } from "../apiSlice";

const initialState = {
  sampleData: [243, 21, 75, 856, 23, 45],
  sampleLabels: ["hello", "hello", "hello", "hello", "hello", "hello"],
  allData: [],
  revenue: [],
  country: {},
  product: {},
  order: {},
  isLoading: false,
};

const dataSlice = createSlice({
  name: "analyticsData",
  initialState,
  reducers: {
    updateSampleData: (state) => {
      return { ...state, sampleData: [59, 80, 81, 56, 55, 40] };
    },
    updateRevenueData: (state, actions) => {
      return { ...state, revenue: actions.payload };
    },
    updateCountryData: (state, actions) => {
      return { ...state, country: { ...actions.payload } };
    },
    updateProductData: (state, actions) => {
      return { ...state, product: { ...actions.payload } };
    },
    updateOrderData: (state, actions) => {
      return { ...state, order: { ...actions.payload } };
    },
    updateIsLoading: (state) => {
      return { ...state, isLoading: !state.isLoading };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderData.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(fetchOrderData.fulfilled, (state, actions) => {
        return { ...state, isLoading: false, allData: [...actions.payload] };
      })
      .addCase(fetchOrderData.rejected, (state) => {
        return { ...state, isLoading: false };
      });
  },
});

export const {
  updateSampleData,
  updateCountryData,
  updateOrderData,
  updateProductData,
  updateRevenueData,
  updateIsLoading,
} = dataSlice.actions;

export default dataSlice.reducer;
