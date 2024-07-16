import { Nav } from "./Nav";
import styles from "./PSW.module.css";
import exceljs from "exceljs";
import React, { useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const PSW = ({ token }) => {
  const [file, setFile] = useState(null);
  const [tagToFind, setTagToFind] = useState("");
  const [replacementText, setReplacementText] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTagChange = (e) => {
    setTagToFind(e.target.value);
  };

  const handleReplacementChange = (e) => {
    setReplacementText(e.target.value);
  };

  const handleFileUpload = async () => {
    if (!file || !tagToFind || !replacementText) {
      alert("Podaj wszystkie dane.");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);

    workbook.eachSheet((worksheet) => {
      worksheet.eachRow((row) => {
        row.eachCell((cell) => {
          if (
            typeof cell.value === "string" &&
            cell.value.includes(tagToFind)
          ) {
            cell.value = cell.value.replace(tagToFind, replacementText);
          }
        });
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "modified.xlsx");
  };
  return (
    <>
      <Nav />
      <div className={styles.PSW_wrapper}>
        <div>
          <h2>Excel - Wyszukiwarka i edytor Tagów</h2>
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
          <br />
          <input
            type="text"
            placeholder="Tag do znalezienia"
            value={tagToFind}
            onChange={handleTagChange}
          />
          <br />
          <input
            type="text"
            placeholder="Tekst zastępujący"
            value={replacementText}
            onChange={handleReplacementChange}
          />
          <br />
          <button onClick={handleFileUpload}>Edytuj</button>
        </div>
      </div>
    </>
  );
};
