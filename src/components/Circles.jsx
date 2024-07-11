import styles from "./Circles.module.css";
import { Nav } from "./Nav";
import { LoginPage } from "./LoginPage";

import drawing from "../images/W05189.jpg";
import { useState } from "react";
import colors from "../JSON/colors.json";

import rotate_left from "../images/rotate_left.svg";
import rotate_right from "../images/rotate_right.svg";

export const Circles = ({ token }) => {
  const newCord = [];

  const [mouse, setMouse] = useState([]);
  const [number, setNumber] = useState(1);
  const [color, setColor] = useState("red");
  const [rotation, setRotation] = useState(0);

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
                  <div
                    className={styles.Circles_prevCircle}
                    style={{
                      border: color + " solid 2px",
                    }}
                  >
                    99
                  </div>
                </div>
                <div className={styles.Circles_colorBox}>
                  {colors.colors.map(({ color }) => {
                    return (
                      <div
                        className={styles.Circles_colorBoxEl}
                        style={{ background: color }}
                        id={color}
                        onClick={() => {
                          setColor(color);
                        }}
                      ></div>
                    );
                  })}
                </div>
                <div className={styles.Circle_rotateBox}>
                  <div
                    className={styles.Circle_rotateBox_Left}
                    onClick={() => {
                      setRotation(rotation - 90);
                    }}
                  >
                    <img src={rotate_left} />
                  </div>
                  <div
                    className={styles.Circle_rotateBox_Right}
                    onClick={() => {
                      setRotation(rotation + 90);
                    }}
                  >
                    <img src={rotate_right} />
                  </div>
                </div>
                <div
                  className={styles.Circles_resetBox}
                  onClick={() => {
                    setMouse([]);
                    setNumber(1);
                  }}
                >
                  <p>Reset</p>
                </div>
                <div
                  className={styles.Circles_resetBox}
                  onClick={() => {
                    setMouse((mouse) => mouse.slice(0, -1));
                    setNumber(number - 1);
                  }}
                >
                  <p>Cofnij</p>
                </div>
              </div>
              <div className={styles.Circles_hero}>
                <img
                  style={{ transform: "rotate(" + rotation + "deg)" }}
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
                      style={{
                        left: X + "px",
                        top: Y + "px",
                        border: color + " solid 2px",
                      }}
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
