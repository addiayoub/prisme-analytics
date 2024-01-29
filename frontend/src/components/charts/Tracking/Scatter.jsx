import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { generateRandomColorsArray } from "../../../utils/generateRandomColorsArray";
import useChartTheme from "../../../hooks/useChartTheme";
import SMIPoids from "./SMIPoids";
import SMIEvolution from "./SMIEvolution";
import AccordionBox from "../../AccordionBox";
import { IconButton } from "@mui/material";
import { RefreshCcw } from "react-feather";
import GridContainer, { GridItem } from "../../Ui/GridContainer";
import useSeriesSelector from "../../../hooks/useSeriesSelector";

const Scatter = ({ data }) => {
  const theme = useChartTheme();
  const [SIM, setSIM] = useState(null);
  const [minSIM, setMinSIM] = useState(null);
  const colors = useMemo(() => generateRandomColorsArray(data.length), [data]);
  const poidsRef = useRef(null);
  console.log("Scatter", data);
  const formatedData = useMemo(() => {
    return data.map((item) => [
      item["Perf relative"] * 100,
      item.TE * 100,
      item.SIM,
    ]);
  }, [data]);
  const seriesData = useMemo(
    () =>
      formatedData.map(([x, y, name], index) => ({
        type: "effectScatter",
        symbol: "circle",
        symbolSize: 20,
        data: [[x, y]],
        itemStyle: {
          color: colors[index],
        },
        name,
      })),
    [formatedData, colors]
  );

  const xValues = useMemo(
    () => data.map((item) => item["Perf relative"] * 100),
    [data]
  );
  const yValues = useMemo(() => data.map((item) => item.TE * 100), [data]);
  const axisValues = {
    x: [Math.min(...xValues), Math.max(...xValues)],
    y: [Math.min(...yValues), Math.max(...yValues)],
  };
  const seriesNames = formatedData.map((item) => item[2]);
  const { SeriesSelector, selectedLegend } = useSeriesSelector(seriesNames);
  useEffect(() => {
    console.log("useEffect min", axisValues);
    const { SIM } = data.find((item) => item.TE * 100 === axisValues.y[0]);
    setMinSIM(SIM);
    setSIM(SIM);
  }, []);
  console.log("min-max", axisValues);
  const options = useMemo(() => {
    return {
      title: {
        text: "Perf relative / TE",
        left: "center",
        top: 0,
        ...theme.title,
      },
      legend: {
        orient: "vertical",
        selected: selectedLegend,
        zLevel: 5,
        right: 0,
        top: "20%",
        height: 200,
        type: "scroll",
        ...theme.legend,
      },
      grid: {
        bottom: "50",
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
          dataView: {},
        },
        right: 0,
        top: 15,
      },
      xAxis: {
        type: "value",
        name: "Performance relative",
        nameLocation: "middle",
        nameGap: 30,
        min: axisValues.x[0] - 1,
        max: axisValues.x[1] + 1,
        axisLabel: {
          formatter: (value) => parseFloat(value).toFixed(2),
          ...theme.xAxis.nameTextStyle,
        },
        nameTextStyle: {
          fontSize: 14,
          ...theme.xAxis.nameTextStyle,
        },
      },

      yAxis: {
        type: "value",
        name: "TE",
        min: axisValues.y[0] - 1,
        max: axisValues.y[1] + 1,
        nameLocation: "middle",
        nameGap: 30,
        axisLabel: {
          formatter: (value) => parseFloat(value).toFixed(2),
          ...theme.yAxis.nameTextStyle,
        },
        nameTextStyle: {
          fontSize: 14,
          ...theme.yAxis.nameTextStyle,
        },
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "cross",
        },
        formatter: function (params) {
          const { seriesName, value } = params;
          return `<strong>${seriesName}</strong> <br /> TE: ${value[1].toFixed(
            2
          )}% <br /> Performance relative: ${value[0].toFixed(2)}%`;
        },
      },

      series: seriesData,
    };
  }, [seriesData, data, selectedLegend, theme]);
  console.log("options", options.series);
  const handleClick = (params) => {
    const { seriesName } = params;
    setSIM(seriesName);
    poidsRef.current.scrollIntoView({
      behavior: "smooth",
    });
    console.log(seriesName);
  };
  return (
    <>
      <SeriesSelector />
      <ReactECharts
        option={options}
        style={{
          height: "500px",
          minWidth: "600px",
          width: "100%",
          margin: "auto",
        }}
        onEvents={{
          click: handleClick,
        }}
      />
      <div ref={poidsRef}>
        {SIM && (
          <AccordionBox isExpanded title={SIM}>
            <IconButton
              onClick={() => setSIM(minSIM)}
              className="bg-primary"
              title="Réinitialiser"
            >
              <RefreshCcw size={18} color="#fff" />
            </IconButton>
            <GridContainer xGap={4} extraCss="gap-x-12 items-center">
              <GridItem cols={5}>
                <SMIPoids SIM={SIM} />
              </GridItem>
              <GridItem cols={7}>
                <SMIEvolution SIM={SIM} />
              </GridItem>
            </GridContainer>
          </AccordionBox>
        )}
      </div>
    </>
  );
};

export default Scatter;
