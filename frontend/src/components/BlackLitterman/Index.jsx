import React, { memo } from "react";
import ValueAtRisk from "./ValueAtRisk/Index.jsx";
import PortfolioOptim from "./PortfolioOptim/Index.jsx";
import MeanRiskOpti from "./MeanRiskOpti/Index.jsx";
import PortfolioAllocation from "./PortfolioAllocation/Index.jsx";
import { Divider } from "@mui/material";

const Index = () => {
  return (
    <>
      <ValueAtRisk />
      <PortfolioOptim />
      {/* <MeanRiskOpti /> */}
      <Divider className="h-[3px] bg-black" />
      <PortfolioAllocation />
    </>
  );
};

export default memo(Index);
