import React from "react";
import AccordionBox from "../Ui/AccordionBox";
import Table from "../Table";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

function isNumber(value) {
  return typeof value === "number";
}

function DfContrib({ title, data }) {
  const columns = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key,
    width: 300,
    renderCell: (params) => {
      return (
        <span style={{ fontWeight: "bold" }}>
          {isNumber(params.row[key]) ? params.row[key] : params.row[key]}
        </span>
      );
    },
  }));
  return (
    // <AccordionBox title={title} isExpanded>
    <>
      <Table columns={columns} rows={data} className="h-fit" legend={title} />
    </>
    // </AccordionBox>
  );
}

export default DfContrib;
