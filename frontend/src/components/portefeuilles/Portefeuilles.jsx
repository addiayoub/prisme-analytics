import React, { memo, useEffect, useState } from "react";
import AccordionBox from "../Ui/AccordionBox";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePortefeuilles,
  getPortefeuilles,
} from "../../redux/actions/UserActions";
import MainLoader from "../loaders/MainLoader";
import Table from "../Table";
import { columns } from "./columns";
import { Box, Button } from "@mui/material";
import PortefeuilleBacktest from "./PortefeuilleBacktest";
import { transformBacktestData } from "../../utils/formatBacktestData";
import { CheckSquare, Trash } from "react-feather";
import { notyf } from "../../utils/notyf";
import Portefeuille from "../OPCVM/Portefeuille";
import PortefeuilleMarko from "../Markowitz/Portefeuille";
import ModalComponent from "../Modal/index";
import EditPortefeuille from "./EditPortefeuille";
import TabsComponent from "../TabsComponent";
import SingleSelect from "../SingleSelect";
import {
  setPtfToBacktest,
  setSelectedPtf,
} from "../../redux/slices/BacktestSlice";
import { setPortefeuilles } from "../../redux/slices/UserSlice";
import UploadPortefeuille from "./UploadPortefuille/UploadPortefeuille";
import ConverTable from "./UploadPortefuille/ConvertTable";
import Choice from "./Choice";
import SavedPtfs from "./UploadPortefuille/SavedPtfs";
import PtfFresh from "./UploadPortefuille/PtfFresh";
import PoidsDonut from "../charts/Backtest/PoidsDonut";
import DeleteModal from "../Modal/DeleteModal";
import { Wallet } from "iconsax-react";

const types = ["Actions", "OPCVM"];
const typesRef = {
  all: ["Actions", "OPCVM"],
  OPCVM: ["OPCVM"],
  Actions: ["Actions"],
};

const Portefeuilles = ({ ptfsType = "all" }) => {
  const {
    portefeuilles: { loading, data },
  } = useSelector((state) => state.user);
  const [selectedPtfs, setSelectedPtfs] = useState([]);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("Actions");
  const [ptf, setPtf] = useState(null);
  const dispatch = useDispatch();
  console.log("New Ptfs", data);
  useEffect(() => {
    dispatch(getPortefeuilles({ type: "" }))
      .unwrap()
      .then()
      .catch(() => notyf.error("Error Fetch portefeuilles"));
  }, []);
  useEffect(() => {
    if (selectedPtfs.length < 1) {
      setShow(false);
    }
  }, [selectedPtfs]);
  useEffect(() => {
    setShow(false);
    if (ptf) {
      const choosen = data.find((item) => item.name === ptf);
      setSelectedPtfs([choosen]);
    } else {
      setSelectedPtfs([]);
    }
  }, [ptf]);
  useEffect(() => setPtf(null), [type]);
  const handlePtfToBacktest = (ptfs, ptfName) => {
    if (ptfName) {
      const choosen = ptfs.find((item) => item.name === ptfName);
      console.log("handlePtfToBacktest", ptfName, ptfs, choosen);
      setSelectedPtfs([choosen]);
      dispatch(setPtfToBacktest(choosen));
      dispatch(setSelectedPtf(ptfName));
      setShow(true);
    } else {
      setSelectedPtfs([]);
      setShow(false);
    }
  };
  const handleFreshPtf = (ptfName, ptfType) => {
    const ptf = {
      name: ptfName,
      field: "poids",
      type: ptfType,
      data: [],
      params: {
        dateDebut: null,
        dateFin: null,
      },
    };
    setSelectedPtfs([ptf]);
    dispatch(setPtfToBacktest(ptf));
    dispatch(setSelectedPtf(ptfName));
    setShow(true);
  };
  const tabs = [
    {
      label: "la liste des portefeuilles enregistrés",
      component: SavedPtfs,
      props: {
        selectedPtfs,
        setSelectedPtfs,
        show,
        setShow,
        ptfsType: typesRef[ptfsType],
      },
    },
    {
      label: "Convert-Table",
      component: ConverTable,
      props: {
        setPtf,
        setType,
        handlePtfToBacktest,
        ptfsType: typesRef[ptfsType],
      },
    },
    {
      label: "Importer un portefeuille",
      component: UploadPortefeuille,
      props: {
        setPtf,
        setType,
        handlePtfToBacktest,
        ptfsType: typesRef[ptfsType],
      },
    },
    {
      label: "Nouveau PTF",
      component: PtfFresh,
      props: { handleFreshPtf, ptfsType: typesRef[ptfsType] },
    },
  ];
  return (
    <>
      {/* <AccordionBox
        title="la liste des portefeuilles enregistrés"
        isExpanded={true}
        detailsClass="flex flex-wrap gap-3 items-center"
      >
        <SingleSelect
          label={"Type"}
          options={types}
          value={type}
          setValue={setType}
        />
        <SingleSelect
          label={"Portefeuilles"}
          options={portefeuilles}
          value={ptf}
          setValue={setPtf}
        />
        <Button
          variant="contained"
          className="min-w-[115px] flex gap-2 items-center"
          color="primary"
          size="small"
          id="valider-btn"
          onClick={() => handleValider(ptf)}
          disabled={!ptf}
        >
          Valider <CheckSquare size={18} />
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          className="min-w-[115px] flex gap-2 items-center"
          onClick={handleDelete}
          disabled={selectedPtfs.length < 1}
        >
          Supprimer <Trash size={18} />
        </Button> */}
      {/* {!loading && (
          <>
            <Table
              rows={data}
              columns={columns}
              withCheckboxes
              showFooter
              setSelectedRows={setSelectedPtfs}
              pageSize={10}
            />
            {selectedPtfs.map(({ data, type, field }) => {
              return type === "OPCVM" ? (
                <Portefeuille data={data} field={field} />
              ) : (
                <PortefeuilleMarko data={data} field={field} />
              );
            })}
          </>
        )} */}

      {/* <Box className="flex gap-3 flex-wrap mt-4 ">
          <Button
            variant="contained"
            color="error"
            className="min-w-[115px] flex gap-2 items-center"
            onClick={handleDelete}
            disabled={selectedPtfs.length < 1}
          >
            Supprimer <Trash size={18} />
          </Button>
          <Button
            variant="contained"
            className="min-w-[115px] flex gap-2 items-center"
            color="primary"
            onClick={handleValider}
            disabled={selectedPtfs.length < 1}
          >
            Valider <CheckSquare size={18} />
          </Button>
        </Box> */}
      {/* </AccordionBox> */}
      <AccordionBox title={"Backtester via"} isExpanded={true} Icon={Wallet}>
        <Choice tabs={tabs} />
      </AccordionBox>
      {/* <ConverTable /> */}
      {/* <AccordionBox title="Importer un portefeuille">
        <UploadPortefeuille
          setPtf={setPtf}
          setType={setType}
          handleValider={handleValider}
        />
      </AccordionBox> */}
      {show && <TabsComponent tabs={selectedPtfs} />}
      {show && <PortefeuilleBacktest />}
      {loading && <MainLoader />}
    </>
  );
};

export default memo(Portefeuilles);
