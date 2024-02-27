import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const fetchOrderData = createAsyncThunk(
    "dilchart/fetchOrderData",
    async () => {
      return axios
        .get("orders")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );