import styles from "./Lab.module.css";
import { useState } from "react";
import { nanoid } from "nanoid";

import { Nav } from "./Nav";
import { LoginPage } from "./LoginPage";
import { Link } from "react-router-dom";
import { MenuSmallEl } from "./MenuSmallEl";

import add from "../images/add.svg";
import results from "../images/results.svg";

import data from "../JSON/lab.json";

export const Lab = ({ token }) => {
  const [extended, setExtended] = useState();

  return (
    <>
      {token === "admin" ? (
        <>
          <Nav />
          <div className={styles.Lab_btn_container}>
            <Link to="/precizo/">
              <MenuSmallEl key={nanoid()} obraz={add} nazwa="Nowe badanie" />
            </Link>
            <Link to="/precizo/">
              <MenuSmallEl key={nanoid()} obraz={results} nazwa="Wyniki" />
            </Link>
          </div>
          <div className={styles.Lab_container}>
            <ul className={styles.Lab_table}>
              <li className={styles.Lab_rowC}>
                <ul className={styles.Lab_header_row}>
                  <li className={styles.el_header_no}>Kolejka</li>
                  <li className={styles.el_header_zb}>Zlecenie badania</li>
                  <li className={styles.el_header_id}>Indeks Wyrobu</li>
                  <li className={styles.el_header_kod}>Kod</li>
                  <li className={styles.el_header_name}>Nazwa wyrobu</li>
                  <li className={styles.el_header_status}>Status</li>
                </ul>
              </li>
              {data.lab.map(({ queue, order, index, code, name, status }) => {
                return (
                  <li className={styles.Lab_rowC} id={order}>
                    {extended === order ? (
                      <div
                        className={styles.Lab_rowContainer}
                        onClick={() => {
                          setExtended("");
                        }}
                      >
                        <ul className={styles.Lab_row}>
                          <li className={styles.el_no}>{queue}</li>
                          <li className={styles.el_zb}>{order}</li>
                          <li className={styles.el_id}>{index}</li>
                          <li className={styles.el_kod}>{code}</li>
                          <li className={styles.el_name}>{name}</li>
                          <li className={styles.el_status}>{status}</li>
                        </ul>
                        <div className={styles.Lab_rowInfo}>
                          <p>
                            Tu pojawi się więcej informacji o zleceniu {order}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <ul
                        className={styles.Lab_row}
                        onClick={() => {
                          setExtended(order);
                        }}
                      >
                        <li className={styles.el_no}>{queue}</li>
                        <li className={styles.el_zb}>{order}</li>
                        <li className={styles.el_id}>{index}</li>
                        <li className={styles.el_kod}>{code}</li>
                        <li className={styles.el_name}>{name}</li>
                        <li className={styles.el_status}>{status}</li>
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
};
