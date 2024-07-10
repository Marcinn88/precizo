import styles from "./Lab.module.css";
import { useState } from "react";
import { nanoid } from "nanoid";

import { Nav } from "./Nav";
import { LoginPage } from "./LoginPage";
import { Link } from "react-router-dom";
import { MenuSmallEl } from "./MenuSmallEl";

import add from "../images/add.svg";
import barcode from "../images/barcode.svg";
import results_ico from "../images/results.svg";

import data from "../JSON/lab.json";
import data_kategorie from "../JSON/kategorie.json";
import { number } from "prop-types";

export const Lab = ({ token }) => {
  const [extended, setExtended] = useState();
  const [newTest, setNewTest] = useState(false);
  const [results, setResults] = useState(false);
  const [category, setCategory] = useState("");
  const [slider, setSlider] = useState(false);
  const [order, setOrder] = useState({});

  const toogleSlider = () => {
    setSlider(!slider);
  };

  const submitNewOrder = (e) => {
    e.preventDefault();
    console.log(order);
    setNewTest(false);
  };

  return (
    <>
      {token === "admin" ? (
        <>
          {newTest && (
            <>
              <form onSubmit={submitNewOrder} className={styles.newTest}>
                {slider && (
                  <div
                    className={styles.newTest_dropdown_backdrop}
                    onClick={() => {
                      setSlider(false);
                    }}
                  ></div>
                )}
                <p className={styles.newTest_Title}>Dodaj badanie</p>
                <span className={styles.Lab_btn_wrapper}>
                  <MenuSmallEl
                    key={nanoid()}
                    obraz={barcode}
                    nazwa="Zeskanuj zlecenie"
                  />
                </span>
                <div className={styles.newTest_Slider_Container}>
                  <div
                    className={styles.newTest_Slider}
                    onClick={() => {
                      toogleSlider();
                    }}
                  >
                    {category === "" ? (
                      <p>Kategoria badania</p>
                    ) : (
                      <p className={styles.newTest_Slider_text}>{category}</p>
                    )}
                  </div>
                  {slider && (
                    <>
                      <div className={styles.newTest_dropdown}>
                        <ul>
                          {data_kategorie.kategoria.map(({ kategoria }) => {
                            return (
                              <li
                                className={styles.slider_el}
                                onClick={() => {
                                  setCategory(kategoria);
                                  setOrder({ ...order, category: kategoria });
                                  setSlider(false);
                                }}
                              >
                                <p>{kategoria}</p>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
                <input
                  className={styles.newTest_input}
                  onChange={(e) => {
                    setOrder({ ...order, number: e.target.value });
                  }}
                  name="zlecenie"
                  type="text"
                  placeholder="Numer zlecenia"
                  pattern="[pzPZ]{2}[0-9]{5}/[0-9]{4}$"
                  title="Podaj pełny numer zlecenia. np. ZP01234/2024"
                  required
                />
                <input
                  className={styles.newTest_input}
                  name="zlecenie"
                  type="text"
                  placeholder="Numer operacji"
                  required
                  onChange={(e) => {
                    setOrder({ ...order, operation: e.target.value });
                  }}
                />
                <button type="submit" className={styles.newTest_button}>
                  Dodaj badanie
                </button>
              </form>
              <div
                onClick={() => {
                  setNewTest(false);
                  setSlider(false);
                }}
                className={styles.newTest_shadowbox}
              ></div>
            </>
          )}
          {results && (
            <>
              <div className={styles.results}>
                <p className={styles.results_Title}>Wyniki</p>
              </div>
              <div
                onClick={() => {
                  setResults(false);
                }}
                className={styles.results_shadowbox}
              ></div>
            </>
          )}
          <Nav />
          <div className={styles.Lab_btn_container}>
            <span
              className={styles.Lab_btn_wrapper}
              onClick={() => {
                setNewTest(true);
                setCategory("");
                setSlider(false);
                setOrder({
                  category: "",
                  number: "",
                  operation: "",
                });
              }}
            >
              <MenuSmallEl key={nanoid()} obraz={add} nazwa="Nowe badanie" />
            </span>
            <span
              className={styles.Lab_btn_wrapper}
              onClick={() => {
                setResults(true);
              }}
            >
              <MenuSmallEl key={nanoid()} obraz={results_ico} nazwa="Wyniki" />
            </span>
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
