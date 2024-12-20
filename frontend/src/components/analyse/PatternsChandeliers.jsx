import React, { memo, useMemo } from "react";
import { candelChartTransformData } from "../../utils/candelChartTransformData";
import { calculateMA } from "../../utils/chart/calculateMA";
import {
  upColor,
  downColor,
  downBorderColor,
  upBorderColor,
} from "../../utils/generateRandomColorsArray";
import TradingChart from "../charts/Default/TradingChart";

const seriesNames = ["optimum", "MA5", "MA10", "MA20", "MA30"];

function PatternsChandeliers({ data }) {
  const data0 = useMemo(
    () =>
      candelChartTransformData(
        data,
        "SEANCE",
        "ouverture",
        "cloture",
        "plus_haut",
        "plus_bas"
      ),
    [data]
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "PATTERNS DE CHANDELIERS",
        left: "left",
        top: "top",
      },
      legend: {
        padding: 10,
      },
      grid: {
        left: "10%",
        right: "10%",
        bottom: "15%",
      },
      xAxis: {
        type: "category",
        data: data0.categoryData,
      },
      seriesNames: { seriesList: seriesNames },
      dataZoom: [
        {
          type: "inside",
          start: 50,
          end: 100,
        },
        {
          show: true,
          type: "slider",
          top: "90%",
          start: 50,
          end: 100,
        },
      ],
      series: [
        {
          name: "optimum",
          type: "candlestick",
          data: data0.values,
          itemStyle: {
            color0: upColor,
            color: downColor,
            borderColor0: upBorderColor,
            borderColor: downBorderColor,
          },
          markPoint: {
            label: {
              formatter: function (param) {
                return param != null ? Math.round(param.value) + "" : "";
              },
            },
            data: [
              {
                name: "Mark",
                // coord: ["2013/5/31", 2300],
                value: 2300,
                itemStyle: {
                  color: "rgb(41,60,85)",
                },
              },
              {
                name: "highest value",
                type: "max",
                valueDim: "highest",
              },
              {
                name: "lowest value",
                type: "min",
                valueDim: "lowest",
              },
              {
                name: "average value on close",
                type: "average",
                valueDim: "close",
              },
            ],
            tooltip: {
              formatter: function (param) {
                return param.name + "<br>" + (param.data.coord || "");
              },
            },
          },
          markLine: {
            symbol: ["none", "none"],
            data: [
              [
                {
                  name: "from lowest to highest",
                  type: "min",
                  valueDim: "lowest",
                  symbol: "circle",
                  symbolSize: 10,
                  label: {
                    show: false,
                  },
                  emphasis: {
                    label: {
                      show: false,
                    },
                  },
                },
                {
                  type: "max",
                  valueDim: "highest",
                  symbol: "circle",
                  symbolSize: 10,
                  label: {
                    show: false,
                  },
                  emphasis: {
                    label: {
                      show: false,
                    },
                  },
                },
              ],
              {
                name: "min line on close",
                type: "min",
                valueDim: "close",
              },
              {
                name: "max line on close",
                type: "max",
                valueDim: "close",
              },
            ],
          },
        },
        {
          name: "MA5",
          type: "line",
          data: calculateMA(5, data0),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: "MA10",
          type: "line",
          data: calculateMA(10, data0),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: "MA20",
          type: "line",
          data: calculateMA(20, data0),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: "MA30",
          type: "line",
          data: calculateMA(30, data0),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
      ],
    };
  }, [data0]);

  return (
    <>
      <TradingChart
        options={options}
        style={{ height: "500px" }}
        saveToExcel={{
          show: true,
          data,
          fileName: options.title.text,
        }}
      />
    </>
  );
}
export default memo(PatternsChandeliers);
