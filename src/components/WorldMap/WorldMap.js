import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import "./worldmap.scss";

import worldMapData from "../../data/worldmapData.json";

function WorldMap() {
  return (
    <div className="worldmap-graph background-box">
      <ComposableMap projection="geoMercator">
        <Geographies geography={worldMapData}>
          {({ geographies }) => {
            return geographies.map((geo) => {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  id={geo.id}
                  fill={"#fff"}
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
}

export default WorldMap;
