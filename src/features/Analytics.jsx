import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData } from "../store/apiSlice";
import BarChart from "../components/BarChart/BarChart";
import Header from "./Header";
import "./analytics.scss";
import { dataFilterFunction } from "../utils/dataFilter";
import {
  updateCountryData,
  updateOrderData,
  updateProductData,
} from "../store/slices/dataSlice";
import LineChart from "../components/LineChart/LineChart";
import WorldMap from "../components/WorldMap/WorldMap";
import DonutChart from "../components/DonutChart/DonutChart";

function Analytics() {
  const dispatch = useDispatch();

  const {
    isLoading,
    allData,
    sampleData,
    sampleLabels,
    country,
    order,
    product,
  } = useSelector((state) => state.analyticsData);

  const separateData = (data) => {
    const countryGraphData = dataFilterFunction(data, "country");
    const productGraphData = dataFilterFunction(data, "productId");
    const orderGraphData = dataFilterFunction(data, "orderDate");
    const genderGraphData = dataFilterFunction(data, "gender");
    console.log("gender data", genderGraphData);

    dispatch(
      updateCountryData({
        labels: Object.keys(countryGraphData),
        dataset: Object.values(countryGraphData).map((ele) => ele.length),
      })
    );
    dispatch(
      updateProductData({
        labels: Object.keys(productGraphData),
        dataset: Object.values(productGraphData).map((ele) => ele.length),
      })
    );
    dispatch(
      updateOrderData({
        labels: Object.keys(orderGraphData),
        dataset: Object.values(orderGraphData).map((data) =>
          data.reduce((sum, ele) => sum + ele.price, 0)
        ),
      })
    );
  };

  useEffect(() => {
    dispatch(fetchOrderData());
  }, []);

  useEffect(() => {
    console.log("data check: ", allData, sampleData);
    if (allData.length > 0) {
      separateData(allData);
    }
  }, [isLoading, allData]);

  return (
    <>
      <Header />
      <div className="analytics-container">
        <LineChart
          title={"Revenue"}
          data={order?.dataset}
          labels={order?.labels}
        />
        <div className="grid-two">
          <BarChart
            title={"Country"}
            data={country?.dataset}
            labels={country?.labels}
          />
          <BarChart
            title={"Products"}
            data={product?.dataset}
            labels={product?.labels}
          />
        </div>
        <WorldMap />
        <div className="grid-two">
          <DonutChart
            title={"Gender"}
            data={sampleData}
            labels={sampleLabels}
          />
          <BarChart title={"Testing"} data={sampleData} labels={sampleLabels} />
        </div>
      </div>
    </>
  );
}

export default Analytics;
