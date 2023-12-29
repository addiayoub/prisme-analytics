import React, { memo, useEffect, useState } from "react";
import AccordionBox from "../AccordionBox";
import DateComponent from "../DateComponent";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getIndices } from "../../redux/actions/DataActions";
import SelectIndices from "../Markowitz/SelectIndices";
import { notyf } from "../../utils/notyf";
import MainLoader from "../loaders/MainLoader";
import { Button } from "@mui/material";
import { getEvolutionB100Portef } from "../../redux/actions/BacktestActions";
import EvolutionB100 from "../charts/EvolutionB100";

const PortefeuilleBacktest = ({ backtestData }) => {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(5, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const {
    evolutionB100Ptfs: { loading, data },
  } = useSelector((state) => state.backtest);
  const dispatch = useDispatch();
  const [indices, setIndices] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getIndices())
      .unwrap()
      .then(({ indices }) => {
        setIndices(indices);
      })
      .catch(() => notyf.error("Error fetch Indices"))
      .finally(() => setIsLoading(false));
  }, []);
  const handleBacktest = () => {
    dispatch(getEvolutionB100Portef({ dateDebut, dateFin, backtestData }))
      .unwrap()
      .then(() => setIsShow(true))
      .catch(() => notyf.error("Error Evolution B100"));
  };
  return (
    <>
      <AccordionBox
        title="Backtest"
        isExpanded={true}
        detailsClass="flex flex-wrap gap-3 items-center"
      >
        <DateComponent
          date={dateDebut}
          setDate={setDateDebut}
          label="Date Début"
        />
        <DateComponent date={dateFin} setDate={setDateFin} label="Date Fin" />
        <SelectIndices
          indices={indices}
          selectedIndices={selectedIndices}
          setSelectedIndices={setSelectedIndices}
          label="Indices"
        />
        <Button variant="contained" size="small" onClick={handleBacktest}>
          Backtester
        </Button>
      </AccordionBox>
      {!loading && isShow && data.length > 0 && <EvolutionB100 data={data} />}
      {(isLoading || loading) && <MainLoader />}
    </>
  );
};

export default memo(PortefeuilleBacktest);
