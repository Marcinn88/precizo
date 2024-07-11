import styles from "./Circles.module.css";
import { Nav } from "./Nav";
import { LoginPage } from "./LoginPage";

import drawing from "../images/W05189.jpg";
import { useState } from "react";

export const Circles = ({ token }) => {
  const newCord = [];

  const [mouse, setMouse] = useState([]);
  const [number, setNumber] = useState(1);

  return (
    <>
      {token === "admin" ? (
        <>
          <Nav />
          <div className={styles.Circles}>
            <div className={styles.Circles_heroContainer}>
              <div className={styles.Circles_sideBarLeft}>
                <p className={styles.Circles_sideBarLeft_title}>Ustawienia</p>
                <div className={styles.Circles_preview}>
                  <div className={styles.Circles_prevCircle}>99</div>
                </div>
                <div className={styles.Circles_colorBox}></div>
              </div>
              <div className={styles.Circles_hero}>
                <img
                  className={styles.Circles_drawing}
                  src={drawing}
                  alt="dokumentacja"
                  onClick={(e) => {
                    setNumber(number + 1);
                    setMouse((mouse) => [
                      ...mouse,
                      { number: number, X: e.pageX - 15, Y: e.pageY - 15 },
                    ]);
                  }}
                />
                {mouse.map(({ X, Y, number }) => {
                  return (
                    <div
                      className={styles.Circles_Circle}
                      style={{ left: X + "px", top: Y + "px" }}
                    >
                      {number}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

// <div
// className={styles.Circles_Circle}
// style={{ left: mouse.X + "px", top: mouse.Y + "px" }}
// //   style={{ left: cordX + "%", top: cordY + "%" }}
// >
// 99
// </div>
