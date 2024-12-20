import React, { useEffect, useState } from "react";
import DateComponent from "../DateComponent";
import AccordionBox from "../Ui/AccordionBox";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  getDataSet,
  getSocietesGestion,
} from "../../redux/actions/OpcvmActions";
import SelectIndices from "../Markowitz/SelectIndices";
import { notyf } from "../../utils/notyf";
import { setParams } from "../../redux/slices/OpcvmSlice";
import { formatDate } from "../../utils/FormatDate";
import { SearchButton } from "../Ui/Buttons";

function PeriodFilter({ dateDebut, setDateDebut, dateFin, setDateFin }) {
  const { societes } = useSelector((state) => state.opcvm);
  const [_societes, setSocietes] = useState([]);
  const [selectedSocietes, setSelectedSocietes] = useState([]);
  const [classes, setClasses] = useState([
    "ACTIONS",
    "DIVERSIFIE",
    "OMLT",
    "OCT",
    "CONTRACTUEL",
    "MONETAIRE",
  ]);
  const [types, setTypes] = useState(["FGP", "FNPP"]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const disabled =
    selectedClasses.length === 0 ||
    selectedSocietes.length === 0 ||
    selectedTypes.length === 0;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("societesGestion")) {
      dispatch(getSocietesGestion())
        .unwrap()
        .then(({ data }) => setSocietes(data))
        .catch((error) => notyf.error("getSocietesGestion " + error));
    } else {
      const sg = JSON.parse(localStorage.getItem("societesGestion"));
      setSocietes(sg);
    }
  }, []);
  const handleSearch = () => {
    const params = {
      dateDebut,
      dateFin,
      classes: selectedClasses,
      societes: selectedSocietes,
      types: selectedTypes,
    };
    dispatch(
      getDataSet({
        dateDebut,
        dateFin,
        classes: selectedClasses,
        societes: selectedSocietes,
      })
    )
      .unwrap()
      .then(() =>
        dispatch(getData(params))
          .unwrap()
          .then(() => {
            console.log("Run dispatch(setParams(params))", params);
            dispatch(setParams(params));
          })
          .catch((error) => notyf.error("getData " + error))
      )
      .catch((error) => notyf.error(error));
  };
  return (
    <AccordionBox
      title={"Filtre"}
      isExpanded={true}
      detailsClass={"flex items-center flex-wrap gap-2"}
    >
      <DateComponent
        label={"Date début"}
        date={dateDebut}
        setDate={setDateDebut}
      />
      <DateComponent label={"Date fin"} date={dateFin} setDate={setDateFin} />
      <SelectIndices
        label={"Sociétés"}
        indices={_societes}
        setSelectedIndices={setSelectedSocietes}
        selectedIndices={selectedSocietes}
      />
      <SelectIndices
        label={"Type OPC"}
        indices={types}
        setSelectedIndices={setSelectedTypes}
        selectedIndices={selectedTypes}
      />
      <SelectIndices
        label={"Classes"}
        indices={classes}
        setSelectedIndices={setSelectedClasses}
        selectedIndices={selectedClasses}
      />
      <SearchButton disabled={disabled} onClick={handleSearch} />
    </AccordionBox>
  );
}

export default PeriodFilter;
