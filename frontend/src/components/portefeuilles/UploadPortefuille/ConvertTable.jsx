import React, { useRef, useEffect, useState } from "react";
import DataGridXL from "@datagridxl/datagridxl2";
import { transformToJSON } from "../../../utils/handleConvertTable";
import { useDispatch } from "react-redux";
import { uploadTable } from "../../../redux/actions/UserActions";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SingleSelect from "../../SingleSelect";
import { setPortefeuilles } from "../../../redux/slices/UserSlice";
import { notyf } from "../../../utils/notyf";
import MainLoader from "../../loaders/MainLoader";
import GridSelection from "../../GridSelection";
import InvalidsTitres from "../../InvalidsTitres";
import PtfForm from "./PtfForm";
import AccordionBox from "../../AccordionBox";
import useDataXLTheme from "../../../hooks/useDataXLTheme";

const ConverTable = ({ setType, setPtf }) => {
  const dgxlRef = useRef(null);
  const [ptfName, setPtfName] = useState("");
  const [ptfType, setPtfType] = useState("Actions");
  const [invalidsTitres, setInvalidsTitres] = useState([]);
  const [noHeaders, setNoHeaders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const theme = useDataXLTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    // Create only once
    if (!dgxlRef.current.grid) {
      dgxlRef.current.grid = new DataGridXL(dgxlRef.current, {
        data: DataGridXL.createEmptyData(rows, cols),
        theme,
        contextMenuItems: [
          "copy",
          "cut",
          "paste",
          "delete_rows",
          "insert_rows_before",
          "insert_rows_after",
          "delete_cols",
          "insert_cols_before",
          "insert_cols_after",
        ],
      });
    }
  }, []);
  useEffect(() => {
    const grid = dgxlRef.current.grid;
    console.log("cols", cols);
    console.log("rows", rows);
    if (grid._isReady) {
      dgxlRef.current.grid = new DataGridXL(dgxlRef.current, {
        data: DataGridXL.createEmptyData(rows, cols),
      });
      console.log("dgxlRef.current", dgxlRef.current.grid);
    }
  }, [cols, rows]);
  useEffect(() => {
    console.log("dgxlRef.current", dgxlRef.current.grid.theme);
    console.log("DataGridXL", DataGridXL);
    dgxlRef.current.grid.theme = theme;
  }, [theme]);
  const upload = () => {
    setLoading(true);
    setInvalidsTitres([]);
    const table = dgxlRef.current;
    const tableData = table.grid.getData();
    console.log("no headers", noHeaders);
    console.log("table.grid.getData()", tableData);
    const data = transformToJSON(tableData, !noHeaders);
    console.log("data to upload", data);
    if (data.length > 0) {
      dispatch(uploadTable({ data, ptfName, ptfType, noHeaders }))
        .unwrap()
        .then((success) => {
          console.log("success", success);
          dispatch(setPortefeuilles(success.portefeuilles));
          setNoHeaders(false);
          setPtfName("");
          notyf.success(success.message);
          setType(ptfType);
          setPtf(ptfName);
          // handleValider(ptfName);
        })
        .catch((failed) => {
          console.log("filed", failed);
          setInvalidsTitres(failed.data);
          notyf.error(failed);
        })
        .finally(() => setLoading(false));
    } else {
      notyf.error("Vérifier le contenu du tableau");
      setLoading(false);
    }
  };
  const isDisabled = !ptfName || !ptfType;
  return (
    <Box className="flex flex-col gap-3">
      <Box className="flex gap-2">
        <GridSelection
          setCols={setCols}
          setRows={setRows}
          rows={rows}
          cols={cols}
        />
      </Box>
      <Box ref={dgxlRef} style={{ height: "400px" }} />
      <PtfForm
        {...{
          ptfType,
          ptfName,
          noHeaders,
          setNoHeaders,
          setPtfName,
          setPtfType,
          upload,
          isDisabled,
        }}
      />
      <InvalidsTitres invalidsTitres={invalidsTitres} />
      {loading && <MainLoader />}
    </Box>
  );
};

export default ConverTable;
