import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData } from "../store/apiSlice";
import BarChart from "../components/BarChart/BarChart";
import Header from "./Header";
import "./analytics.scss";
import { dataFilterFunction, modifyData } from "../utils/dataFilter";
import {
  updateAgeData,
  updateCountryData,
  updateGenderData,
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
    gender,
    age
  } = useSelector((state) => state.analyticsData);

  const dataProps={
    country: "country",
    product: "productId",
    order: "orderDate",
    gender: "gender",
    age: "age"
  }

  const separateData = (data) => {
    const countryGraphData = dataFilterFunction(data, dataProps.country);
    const productGraphData = dataFilterFunction(data, dataProps.product);
    const orderGraphData = dataFilterFunction(data, dataProps.order);
    const genderGraphData = dataFilterFunction(data, dataProps.gender);
    const ageGraphData = dataFilterFunction(data, dataProps.age);
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
    dispatch(
      updateGenderData({
        labels: Object.keys(genderGraphData),
        dataset: Object.values(genderGraphData).map((ele) => ele.length),
      })
    );
    dispatch(
      updateAgeData({
        labels: Object.keys(ageGraphData),
        dataset: Object.values(ageGraphData).map((ele) => ele.length),
      })
    );
  };

  useEffect(() => {
    dispatch(fetchOrderData());
  }, []);

  useEffect(() => {
    console.log("data check: ", allData, sampleData);
    if (allData.length > 0) {
      separateData(modifyData(allData));
      console.log("modify Data: ", modifyData(allData))
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
        <WorldMap title={"World"} labels={country?.labels} data={country?.dataset} />
        <div className="grid-two">
          <DonutChart
            title={"Gender"}
            data={gender?.dataset}
            labels={gender?.labels}
          />
          <BarChart title={"Age"} data={age?.dataset} labels={age?.labels} />
        </div>
      </div>
    </>
  );
}

export default Analytics;
