import React from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import moment from "moment";
import { generateRandomColorsArray } from "../../../utils/generateRandomColorsArray";
import SaveToExcel from "../../SaveToExcel";
const Poids = ({ data }) => {
  const seriesNames = Object.keys(data[0]).filter((key) => {
    console.log(key !== "seance");
    return !["PTF", "seance"].includes(key);
  });
  const theme = useChartTheme();
  console.log("seriesname", seriesNames);
  const options = {
    color: generateRandomColorsArray(seriesNames.length),
    title: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
      confine: true,
      valueFormatter: (value) => value?.toFixed(2),
    },
    legend: {
      type: "scroll",
      orient: "horizontal",
      zLevel: 23,
      width: "60%",
      left: "center",
      bottom: "9%",
      ...theme.legend,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      right: "100px",
      top: "10%",
      // right: "3%",
      bottom: "15%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
    ],
    series: seriesNames.map((serieName) => {
      return {
        name: serieName,
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: true,
        areaStyle: {
          opacity: 0.8,
        },
        emphasis: {
          focus: "series",
        },
        data: data.map((item) => item[serieName]),
      };
    }),
  };
  return (
    <div className="relative">
      <SaveToExcel data={data} fileName="Poids" />
      <ReactECharts
        option={options}
        style={{
          height: "500px",
          maxHeight: "600px",
        }}
      />
    </div>
  );
};

export default Poids;
