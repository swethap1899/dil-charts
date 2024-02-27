import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/dataSlice";

const rootReducers = combineReducers({
  analyticsData: dataSlice,
});

export default configureStore({
  reducer: rootReducers,
});
