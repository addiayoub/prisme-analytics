import React, { memo, useMemo, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { getFullscreenFeature } from "../../../utils/chart/defaultOptions";
import useChartTheme from "../../../hooks/useChartTheme";
import useSeriesSelector from "../../../hooks/useSeriesSelector";
import { Box } from "@mui/material";
import SaveToExcel from "../../SaveToExcel";

const initSaveToExcel = {
  show: false,
  data: [],
  fileName: new Date().getTime(),
};

const zoomOpts = [
  {
    type: "inside",
    start: 0,
    end: 100,
  },
  {
    show: true,
    type: "slider",
    start: 0,
    end: 100,
  },
];

const BarChart = ({
  options,
  style,
  showSeriesSelector,
  saveToExcel = initSaveToExcel,
}) => {
  console.log("options", options, saveToExcel);
  const chart = useRef(null);
  const myFullscreen = getFullscreenFeature(chart);
  const theme = useChartTheme();
  const { show, data, fileName } = saveToExcel;
  console.log("render BarChart");
  const {
    title,
    grid,
    tooltip,
    xAxis,
    series,
    yAxis,
    legend,
    dataZoom = false,
    seriesNames: { seriesList = [], init = [] } = {},
    ...rest
  } = options;
  const { SeriesSelector, selectedLegend } = useSeriesSelector(
    seriesList,
    init
  );
  const zoom = dataZoom ? { dataZoom: zoomOpts } : {};
  const baseOptions = useMemo(() => {
    return {
      title: {
        ...(title ?? {}),
        ...theme.title,
      },
      legend: {
        orient: "horizontal",
        zLevel: 23,
        width: "70%",
        bottom: "0%",
        type: "scroll",
        left: "center",
        textStyle: {
          width: 150,
          rich: {
            fw600: {
              fontWeight: 600,
            },
          },
        },
        selected: selectedLegend,
        ...(legend ?? {}),
        ...theme.legend,
      },
      xAxis: {
        ...(xAxis ?? {}),
        axisLabel: {
          hideOverlap: true,
          ...xAxis?.axisLabel,
          ...theme.xAxis.nameTextStyle,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        ...theme.xAxis,
      },
      yAxis: Array.isArray(yAxis)
        ? yAxis.map((yAxisConfig) => ({
            type: "value",
            ...yAxisConfig,
            axisLabel: {
              hideOverlap: true,
              ...yAxisConfig?.axisLabel,
              ...theme.yAxis.nameTextStyle,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            ...theme.yAxis,
          }))
        : [
            {
              type: "value",
              ...yAxis,
              axisLabel: {
                hideOverlap: true,
                ...yAxis?.axisLabel,
                ...theme.yAxis.nameTextStyle,
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              ...theme.yAxis,
            },
          ],
      grid: {
        bottom: "7%",
        top: "10%",
        containLabel: true,
        ...(grid ?? {}),
      },
      tooltip: {
        trigger: "axis",
        textStyle: {
          overflow: "breakAll",
          width: 40,
        },
        confine: true,
        valueFormatter: (value) => value?.toFixed(2) + "%",
        ...(tooltip ?? {}),
      },
      toolbox: {
        feature: {
          myFullscreen,
          magicType: {
            show: true,
            type: ["line", "bar"],
            option: {
              line: {
                smooth: true,
              },
            },
            iconStyle: { borderColor: "blue" },
          },
          dataZoom: {
            yAxisIndex: true,
            iconStyle: { borderColor: "blue" },
          },
          restore: { iconStyle: { borderColor: "blue" } },
          saveAsImage: { iconStyle: { borderColor: "blue" } },
          dataView: { iconStyle: { borderColor: "blue" } },
        },
        top: "20px",
      },
      series,
      ...zoom,
      ...rest,
    };
  }, [series, selectedLegend, options, theme]);

  return (
    <Box className="relative w-full">
      {show && <SaveToExcel data={data} fileName={fileName} />}
      {showSeriesSelector && <SeriesSelector />}
      <ReactECharts
        option={baseOptions}
        key={JSON.stringify(baseOptions)}
        style={style}
        ref={chart}
      />
    </Box>
  );
};

export default memo(BarChart);
