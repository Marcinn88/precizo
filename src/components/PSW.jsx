import { Nav } from "./Nav";
import styles from "./PSW.module.css";
import React, { useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import data from "../JSON/PSW_Agco_parm.json";
const dane = data.PSW_Agco_parm;

export const PSW = ({ token }) => {
  const [file, setFile] = useState(null);
  const [tagToFind, setTagToFind] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const total = Object.keys(data.PSW_Agco_parm[0]);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);

    total.map((key) => {
      workbook.eachSheet((worksheet) => {
        worksheet.eachRow((row) => {
          row.eachCell((cell) => {
            if (
              typeof cell.value === "string" &&
              cell.value.includes(tagToFind)
            ) {
              cell.value = cell.value.replace(key, dane[0][`${key}`]);
            }
          });
        });
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, dane[0].Indeks + "_W" + dane[0].Wariant + ".xlsx");
  };
  return (
    <>
      <Nav />
      <div className={styles.PSW_wrapper}>
        <div>
          <h2>Excel - Automatyczny generator PSW</h2>
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
          <br />
          <button onClick={handleFileUpload}>Generuj</button>
        </div>
      </div>
    </>
  );
};
