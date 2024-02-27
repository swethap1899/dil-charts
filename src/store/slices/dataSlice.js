import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderData } from "../apiSlice";

const initialState = {
  allData: [],
  revenue: [],
  isLoading: false,
};

const dataSlice = createSlice({
  name: "analyticsData",
  initialState,
  reducers: {
    updateRevenueData: (state, actions) => {
      return { ...state, revenue: actions.payload };
    },
    updateIsLoading: (state) => {
      return { ...state, isLoading: !state.isLoading };
    },
  },
  extraReducers: {
    [fetchOrderData.pending]: (state) => {
      return { ...state, isLoading: true };
    },
    [fetchOrderData.fulfilled]: (state, actions) => {
      return { ...state, isLoading: false, allData: [...actions.payload] };
    },
    [fetchOrderData.pending]: (state) => {
      return { ...state, isLoading: false };
    },
  },
});

export const { updateRevenueData, updateIsLoading } = dataSlice.actions;

export default dataSlice.reducer;
