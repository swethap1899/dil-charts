import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import "./worldmap.scss";

import worldMapData from "../../data/worldmapData.json";
import PopUpWindow from "../PopUpWindow/PopUpWindow";
import ChartHeader from "../ChartHeader/ChartHeader";

function WorldMap({ title, data, labels }) {
  const [popup, setPopup] = useState(false);
  const togglePopUp = () => {
    setPopup(!popup);
  };

  const colorScale = scaleLinear()
    .domain([Math.min(...(data || [])), Math.max(...(data || []))])
    .range(["#DE046D33", "#DE046DFF"]);

  const ChartData = (
    <div className="worldmap-graph background-box">
      <ChartHeader title={title} popup={popup} togglePopUp={togglePopUp} />
      <ComposableMap height={300} projection="geoMercator">
        <Geographies geography={worldMapData}>
          {({ geographies }) => {
            return geographies.map((geo) => {
              let indexCountry = null;
              labels?.map((ele, i) => {
                if (ele === geo.properties.name) {
                  indexCountry = i;
                }
                return indexCountry;
              });

              const getColor = () => {
                return indexCountry ? colorScale(data[indexCountry]) : "#fff";
                // return "#344E41";
              };
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  id={geo.id}
                  fill={getColor()}
                  stroke="#999999"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      outline: "none",
                    },
                    hover: {
                      cursor: "pointer",
                      outline: "none",
                    },
                    pressed: {
                      outline: "none",
                    },
                  }}
                />
              );
            });
          }}
        </Geographies>
      </ComposableMap>
    </div>
  );

  if (popup) return <PopUpWindow>{ChartData}</PopUpWindow>;
  else return ChartData;
}

export default WorldMap;
