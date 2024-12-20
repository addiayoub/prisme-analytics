import React, { useMemo } from "react";
import LineChart from "../Default/LineChart";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";

const getSeries = (seriesNames, data) => {
  return seriesNames.map((serieName) => ({
    name: serieName,
    type: "line",
    // symbol: "none",
    data: data.map((item) => item[serieName]),
  }));
};

export const ChartMulti = ({ data, xAxis, title, isPerce }) => {
  const xData = useMemo(() => data.data.map((item) => item[xAxis]), [data]);
  const seriesNames = useMemo(
    () => Object.keys(data.data[0]).filter((item) => item !== xAxis),
    [data, xAxis]
  );
  const series = useMemo(() => getSeries(seriesNames, data.data), [data]);
  const options = useMemo(() => {
    return {
      title: { text: "", x: "center" },
      tooltip: {
        trigger: "item",
        valueFormatter: (value) =>
          `${formatNumberWithSpaces(value)}${isPerce ? "%" : ""}`,
      },
      xAxis: {
        type: "category",
        data: xData,
      },
      yAxis: {
        type: "value",
        min: function (value) {
          return value.min?.toFixed(2);
        },
        axisLabel: {
          formatter: (value) =>
            `${formatNumberWithSpaces(value)}${isPerce ? "%" : ""}`,
        },
      },
      series,
    };
  }, [xAxis, title, isPerce]);

  return (
    <div className="">
      <div
        className=" w-full text-center flex flex-col gap-2"
        style={{ zIndex: 2 }}
      >
        <h6 className="text-[22px] text-center">{title}</h6>
        <span className="text-muted">({data.maxX})</span>
        {data?.maxY && (
          <div className="flex flex-col gap-1">
            <span className="font-bold text-[20px]">
              {`${formatNumberWithSpaces(data.maxY)}${isPerce ? "%" : ""}`}
            </span>
            {!isPerce && <span className="underline">{data?.unite}</span>}
          </div>
        )}
      </div>
      <div className="relative mt-3">
        <LineChart
          options={options}
          saveToExcel={{ show: true, data, fileName: title }}
        />
        {data?.Source && (
          <span className="absolute bottom-[-10px] right-[10%] text-muted underline hover:text-primary text-sm">
            Source: {data?.Source}
          </span>
        )}
      </div>
    </div>
  );
};
