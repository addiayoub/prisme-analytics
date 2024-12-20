import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { memo } from "react";
import { Save } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { savePortefeuille } from "../redux/actions/UserActions";
import { notyf } from "../utils/notyf";
import ModalComponent from "./Modal/index";
import { filterByPtf } from "../utils/filterByPtf";
import { extractPtfKeys } from "../utils/extractPtfKeys";
import {
  setPtfToBacktest,
  setSelectedPtf,
} from "../redux/slices/BacktestSlice";
import { injectMinMax } from "../utils/injectId";
import OverridePtf from "./OverridePtf";

const SavePortefeuille = ({
  data,
  type,
  field,
  saveAll,
  oldParams,
  dataToSave = [],
  isDisabled,
}) => {
  const { ptfName } = useSelector((state) => state.ptf);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(ptfName);
  const [error, setError] = useState("");
  const [choice, setChoice] = useState("single");
  const [isSaving, setIsSaving] = useState(false);
  const [override, setOverride] = useState(false);
  const [showOverride, setShowOverride] = useState(false);
  console.log("saveAll", saveAll);
  console.log("oldParams", oldParams);
  console.log("pure data", data);
  console.log("data to Save", data);
  data = injectMinMax(data);
  console.log("data injectMinMax", data);
  useEffect(() => setTitle(ptfName), [ptfName]);
  const { params } =
    type === "OPCVM"
      ? useSelector((state) => state.opcvm)
      : useSelector((state) => state.rapport);
  const dispatch = useDispatch();
  const handleSave = (decision) => {
    setIsSaving(true);
    setShowOverride(false);
    setOverride(false);
    console.log("Title", title);
    console.log("params", params);
    console.log("choice", choice);
    const isPtf = field.startsWith("ptf");
    let ptfs = [];
    if (choice === "all") {
      const fields = extractPtfKeys(data);
      const portefeuilles = [];
      console.log("ALLO", fields, data);
      console.log("we will save", data);
      fields.forEach((field, index) => {
        const ptf = {
          name: `${title.trim()} ${index + 1}`,
          type,
          field,
          params,
          data: filterByPtf(data, field, isPtf),
        };

        portefeuilles.push(ptf);
      });
      ptfs.push(...portefeuilles);
    } else {
      const portefeuille = {
        name: title.trim(),
        type,
        field,
        params: oldParams ? oldParams : params,
        data: filterByPtf(data, field, isPtf),
      };
      console.log("we will save filterByPtf ", portefeuille);
      ptfs.push(portefeuille);
    }
    dispatch(savePortefeuille({ portefeuille: ptfs, override: decision }))
      .unwrap()
      .then(({ message, portefeuilles }) => {
        reset();
        // dispatch(setPortefeuilles(portefeuilles));
        dispatch(setPtfToBacktest(ptfs[0]));
        dispatch(setSelectedPtf(ptfs[0]["name"]));
        notyf.success(message);
      })
      .catch(({ message, exists }) => {
        console.log("SAVE ERROR", message, exists);
        if (exists) {
          setShowOverride(true);
        }
        notyf.error(message);
      })
      .finally(() => setIsSaving(false));
  };
  const reset = () => {
    setOpen(false);
    setOverride(false);
    setShowOverride(false);
    setTitle(ptfName ? ptfName : "");
  };

  const handleOverride = (decision) => {
    if (decision) {
      setOverride(true);
      handleSave(true);
    }
    setOverride(false);
    setShowOverride(false);
  };

  return (
    <>
      <Box className="p-3 flex flex-wrap">
        <Button
          onClick={() => {
            setOpen(true);
            setChoice("single");
          }}
          variant="contained"
          size="small"
          // disabled={isDisabled}
          className="mr-2"
        >
          <span className="mr-2">Enregistrer</span>
          <Save size={18} />
        </Button>
        {saveAll && (
          <Button
            onClick={() => {
              setOpen(true);
              setChoice("all");
            }}
            variant="contained"
            color="success"
            size="small"
          >
            <span className="mr-2">Enregistrer Tous</span>
            <Save size={18} />
          </Button>
        )}
      </Box>

      <ModalComponent open={open} handleClose={reset}>
        <Box>
          <Typography variant="h6" mb={3}>
            Enregister{" "}
            {choice === "all" ? "des portefeuilles" : "un portefeuille"}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            height: "250px",
            width: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            mt: 3,
          }}
        >
          <TextField
            id="portefeuille-titre"
            label="Titre du portefeuille"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            autoFocus
          />
          {showOverride && !isSaving && (
            <OverridePtf {...{ handleOverride, title }} />
          )}
          <Box
            sx={{
              alignSelf: "end",
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{
                margin: "0 10px",
              }}
              onClick={reset}
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              onClick={() => handleSave(false)}
              disabled={!title || isSaving || showOverride}
            >
              {isSaving ? "Veuillez patienter..." : "Enregistrer"}
            </Button>
          </Box>
        </Box>
      </ModalComponent>
    </>
  );
};

export default memo(SavePortefeuille);
