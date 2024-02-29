import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderData } from "../apiSlice";

const initialState = {
  sampleData: [243, 21, 75, 856, 23, 45],
  sampleLabels: ["hello", "hello", "hello", "hello", "hello", "hello"],
  allData: [],
  filteredData: [],
  revenue: [],
  country: {},
  product: {},
  order: {},
  gender: {},
  age: {},
  selectedFilters: {},
  isLoading: false,
};

const dataSlice = createSlice({
  name: "analyticsData",
  initialState,
  reducers: {
    updateFilteredData: (state, actions) => {
      return { ...state, filteredData: [...actions.payload] };
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
    updateGenderData: (state, actions) => {
      return { ...state, gender: actions.payload };
    },
    updateAgeData: (state, actions) => {
      return { ...state, age: actions.payload };
    },
    updateIsLoading: (state) => {
      return { ...state, isLoading: !state.isLoading };
    },
    updateSelectedFilters: (state, actions) => {
      return {
        ...state,
        selectedFilters: actions.payload,
      };
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
  updateFilteredData,
  updateCountryData,
  updateOrderData,
  updateProductData,
  updateRevenueData,
  updateGenderData,
  updateAgeData,
  updateIsLoading,
  updateSelectedFilters,
} = dataSlice.actions;

export default dataSlice.reducer;
