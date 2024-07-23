import styles from "./MT.module.css";
import { Nav } from "./Nav";
import { LoginPage } from "./LoginPage";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";

import camera_green from "../images/camera_green.svg";
import camera_red from "../images/camera_red.svg";

export const MT = ({ token }) => {
  const videoRef = useRef(null);
  const photoRef = useRef();

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

  //   const printImage = () => {
  //     const input = document.getElementById("divToPrint");
  //     html2canvas(input).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const a = document.createElement("a");
  //       a.href = imgData;
  //       a.download = "Circle.png";
  //       a.click();
  //     });
  //   };

  return (
    <>
      {token === "admin" ? (
        <>
          <Nav />
          <div className={styles.Camera_container}>
            <div className={styles.Camera}>
              <video className={styles.camera} ref={videoRef}></video>
            </div>
            <div className={styles.CameraBtns}>
              <div className={styles.CameraEl_wrapper}>
                <img
                  className={styles.CameraEl_img}
                  alt=""
                  src={camera_green}
                />
                <p className={styles.CameraEl_title}>Zgodny</p>
              </div>
              <div className={styles.CameraEl_wrapper}>
                <img className={styles.CameraEl_img} alt="" src={camera_red} />
                <p className={styles.CameraEl_title}>Niezgodny</p>
              </div>
            </div>
            <div className={styles.SummaryBtn_wrapper}>
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
