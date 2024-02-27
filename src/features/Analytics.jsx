import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData } from "../store/apiSlice";

function Analytics() {
  const dispatch = useDispatch();

  const { isLoading, allData } = useSelector((state) => state.analyticsData);

  useEffect(() => {
    dispatch(fetchOrderData());
  }, []);

  useEffect(() => {
    console.log("data check: ", allData);
  }, [isLoading, allData]);

  return <div>Analytics</div>;
}

export default Analytics;
