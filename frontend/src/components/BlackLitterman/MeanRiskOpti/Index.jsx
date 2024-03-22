import React, { memo, useState, useEffect } from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import MainLoader from "../../loaders/MainLoader";
import SharpeMeanVar from "../../charts/BlackLitterman/MeanRiskOpti/SharpeMeanVar";
import Frontier from "../../charts/BlackLitterman/MeanRiskOpti/Frontier";
import RiskMeasures from "../../charts/BlackLitterman/PortfolioAllocation/RiskMeasures";
import Table from "../../Table";
import { assetClassesColumns } from "./columns";
import FrontierMean from "../../charts/BlackLitterman/MeanRiskOpti/FrontierMean";
import Upload from "../../Backtest/UploadPtf/Upload";
import Opc from "./OPC/index";
const Index = ({ type = "all" }) => {
  const [showFilter, setShowFilter] = useState(false);
  const {
    meanRiskOpti: { data, loading, error },
  } = useSelector((state) => state.blackLitterman);
  const show = !loading;
  const [isShow, setIsShow] = useState(false);
  const [key, setKey] = useState(0); // force render
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [type]);

  return (
    <React.Fragment key={key}>
      <Upload
        key={key}
        show={showFilter}
        setShow={setShowFilter}
        ptfsType={type}
      />
      {showFilter && <Filter ptfType={type} setIsShow={setIsShow} />}
      {/* <Views /> */}
      {loading && <MainLoader />}
      {showFilter && isShow && <Opc />}
      {/* {show && data.assetClasses.length > 0 && (
        <Table rows={data.assetClasses} columns={assetClassesColumns} />
      )}
      {show && data.weights.length > 0 && (
        <SharpeMeanVar data={data.weights} title="Sharpe Mean Variance" />
      )}
      {show && data.weightsBl.length > 0 && (
        <SharpeMeanVar data={data.weightsBl} title="Sharpe Black Litterman" />
      )}
      {show && data.weightsBl.length > 0 && <Frontier data={data.frontier} />}
      {show && data.ws.length > 0 && <RiskMeasures data={data.ws} />}
      {show && data.ws.length > 0 && data.mu.length > 0 && (
        <FrontierMean xAxisData={data.mu[0]} yAxisData={data.ws} />
      )} */}
    </React.Fragment>
  );
};

export default memo(Index);
