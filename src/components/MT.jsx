import styles from "./MT.module.css";
import { Nav } from "./Nav";
import { LoginPage } from "./LoginPage";
import { useEffect, useRef, useState } from "react";

import html2canvas from "html2canvas";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import camera_green from "../images/camera_green.svg";
import camera_red from "../images/camera_red.svg";
import order from "../JSON/order.json";
// import MTreport from "../Excel/MT.xlsx";

// console.log(order)

export const MT = ({ token }) => {
  const videoRef = useRef(null);
  const photoRef = useRef();
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [raport, setRaport] = useState(false);
  const [number, setNumber] = useState(1);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: screen.width,
          height: screen.height,
          facingMode: { exact: "environment" },
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      });
  }, [videoRef]);

  const trimData = (data) => {
    if (data < 10) {
      return "0" + data;
    } else {
      return data;
    }
  };

  const dateFunction = () => {
    const fullData = new Date();
    const year = fullData.getFullYear();
    const day = trimData(fullData.getDate());
    const month = trimData(fullData.getMonth() + 1);
    const hours = trimData(fullData.getHours());
    const minutes = trimData(fullData.getMinutes());
    const seconds = trimData(fullData.getSeconds());
    const time = `_${hours}${minutes}${seconds}`;
    const data = `${year}${month}${day}${time}`;
    console.log("year", year, "month", month, "day", day, "time", time);
    return data;
  };

  const writeDate = () => {
    const fullData = new Date();
    const year = fullData.getFullYear();
    const day = trimData(fullData.getDate());
    const month = trimData(fullData.getMonth() + 1);
    const data = `${year}.${month}.${day}`;
    return data;
  };

  const onGood = () => {
    console.log("OK");
    console.log(trimData(8));
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = imgData;
      a.download = `OK_${dateFunction()}`;
      a.click();
    });
    setResults((results) => [
      ...results,
      {
        number: number,
        order: order[0].numer,
        name: order[0].nazwa,
        result: "OK",
        file: "OK_" + dateFunction(),
        data: writeDate(),
        operator: "Marcin Piórkowski",
      },
    ]);
    setNumber(number + 1);
  };

  const onBad = () => {
    console.log("NOK");
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = imgData;
      a.download = `NOK_${dateFunction()}`;
      a.click();
    });
    setResults((results) => [
      ...results,
      {
        number: number,
        order: order[0].numer,
        name: order[0].nazwa,
        result: "NOK",
        file: "NOK_" + dateFunction(),
        data: writeDate(),
        operator: "Marcin Piórkowski",
      },
    ]);
    setNumber(number + 1);
  };

  const onFinish = () => {
    console.log(results);
    setRaport(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    // const total = Object.keys(results);
    // console.log(results);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);
    const worksheet = workbook.getWorksheet(1);
    worksheet.getCell(`D5`).value = order[0].nazwa;
    worksheet.getCell(`D6`).value = order[0].indeks;
    worksheet.getCell(`D7`).value = order[0].numer;
    results.map(({ data, number, result, file, operator }) => {
      worksheet.getCell(`B1${number}`).value = data;
      worksheet.getCell(`C1${number}`).value = number;
      worksheet.getCell(`D1${number}`).value = result;
      worksheet.getCell(`E1${number}`).value = operator;
      worksheet.getCell(`F1${number}`).value = file;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "RaportMT.xlsx");
  };

  const onGenerate = () => {
    setRaport(false);
    handleFileUpload();
  };

  return (
    <>
      {token === "admin" ? (
        <>
          <Nav />
          <div className={styles.Camera_container}>
            {raport && (
              <>
                <div
                  className={styles.Raport_Shadow}
                  onClick={() => {
                    setRaport(false);
                  }}
                ></div>
                <div className={styles.Raport}>
                  <p>Generuj raport badania MT dla zlecenia {order[0].numer}</p>
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileChange}
                  />
                  <div className={styles.Raport_Results}>
                    <div className={styles.Raport_Results_Row}>
                      <table className={styles.Table}>
                        <tr>
                          <th>
                            <input type="checkbox" />
                          </th>
                          <th>Numer</th>
                          <th>Wyniki badania</th>
                          <th>Zdjęcie</th>
                        </tr>
                        {results.map(({ number, result, file }) => {
                          return (
                            <tr>
                              <td>
                                <input type="checkbox" />
                              </td>
                              <td>{number}</td>
                              <td>{result}</td>
                              <td>{file}</td>
                            </tr>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                  <div
                    className={styles.SummaryBtn_wrapper}
                    onClick={() => {
                      onGenerate();
                    }}
                  >
                    <p className={styles.SummaryBtn_title}>Generuj</p>
                  </div>
                </div>
              </>
            )}
            <div className={styles.Camera} id="divToPrint">
              <video className={styles.Video} ref={videoRef}></video>
            </div>
            <div className={styles.CameraBtns}>
              <div
                className={styles.CameraEl_wrapper}
                onClick={() => {
                  onGood();
                }}
              >
                <img
                  className={styles.CameraEl_img}
                  alt=""
                  src={camera_green}
                />
                <p className={styles.CameraEl_title}>Zgodny</p>
              </div>
              <div
                className={styles.CameraEl_wrapper}
                onClick={() => {
                  onBad();
                }}
              >
                <img className={styles.CameraEl_img} alt="" src={camera_red} />
                <p className={styles.CameraEl_title}>Niezgodny</p>
              </div>
            </div>
            <div
              className={styles.SummaryBtn_wrapper}
              onClick={() => {
                onFinish();
              }}
            >
              <p className={styles.SummaryBtn_title}>Generuj raport</p>
            </div>
          </div>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
};
