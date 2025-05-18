import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import mapConfig from "./config/map.json";

interface CountryCount {
  [country: string]: number;
}

export const WorldMapChart = ({ data }: { data: CountryCount }) => {
  const counts = Object.values(data);
  const minCount = Math.min(...counts, 0);
  const maxCount = Math.max(...counts, 1);

  const colorScale = scaleLinear<string>()
    .domain([minCount, maxCount])
    .range(["#d9f0d3", "#8B0000"]);

  return (
    <ComposableMap>
      <Geographies geography={mapConfig}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const countryName = geo.properties.name;
            const count = data[countryName] ?? 0;

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={count ? colorScale(count) : "#EEE"}
                stroke="#DDD"
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};
