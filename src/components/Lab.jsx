import styles from "./Lab.module.css";

import { nanoid } from "nanoid";

import { Nav } from "./Nav";
import { LoginPage } from "./LoginPage";
import { Link } from "react-router-dom";
import { MenuSmallEl } from "./MenuSmallEl";

import add from "../images/add.svg";
import results from "../images/results.svg";

import data from "../JSON/lab.json";

export const Lab = ({ token }) => {
  console.log(data.lab);
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
              {data.lab.map(({ queue, order, id, code, name, status }) => {
                return (
                  <li className={styles.Lab_rowC}>
                    <ul className={styles.Lab_row}>
                      <li className={styles.el_no}>{queue}</li>
                      <li className={styles.el_zb}>{order}</li>
                      <li className={styles.el_id}>{id}</li>
                      <li className={styles.el_kod}>{code}</li>
                      <li className={styles.el_name}>{name}</li>
                      <li className={styles.el_status}>{status}</li>
                    </ul>
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
