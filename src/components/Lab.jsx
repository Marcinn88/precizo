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
import data_results from "../JSON/lab_results.json";
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
    // console.log(order);
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
                  name="operacja"
                  type="text"
                  placeholder="Numer operacji"
                  pattern="[0-9]{2,4}"
                  title="Podaj numer operacji."
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
              {/* Modal: Wyniki próbkowania */}
              <div className={styles.results}>
                <p className={styles.results_Title}>Wyniki</p>
                {/* <p className={styles.results_subTitle}>
                  Lista ostatnich 10 wyników badań.
                </p> */}
                <div className={styles.results_table}>
                  {data_results.lab_results.map(
                    ({
                      order,
                      nazwa,
                      indeks,
                      numer,
                      obrabiarka,
                      nazwa_op,
                      numer_op,
                      operator,
                      test_result,
                    }) => {
                      return (
                        <div className={styles.results_container}>
                          <ul className={styles.results_lista}>
                            <li className={styles.results_lista_el}>
                              <p className={styles.results_tittle}>
                                Numer badania:
                              </p>
                              <p
                                className={
                                  order.charAt(order.length - 1) <= 2
                                    ? styles.results_value
                                    : styles.results_value_red
                                }
                              >
                                {order}
                              </p>
                            </li>
                            <li className={styles.results_lista_el}>
                              <p className={styles.results_tittle}>Nazwa:</p>
                              <p className={styles.results_value}>
                                {nazwa.length > 10
                                  ? nazwa.slice(0, 10) + "..."
                                  : nazwa.length === 0
                                  ? "-"
                                  : nazwa}
                              </p>
                            </li>
                            <li className={styles.results_lista_el}>
                              <p className={styles.results_tittle}>Indeks:</p>
                              <p className={styles.results_value}>
                                {indeks.length === 0 ? "-" : indeks}
                              </p>
                            </li>
                            <li className={styles.results_lista_el}>
                              <p className={styles.results_tittle}>
                                Numer Zlecenia:
                              </p>
                              <p className={numer}>
                                {numer.length === 0 ? "-" : numer}
                              </p>
                            </li>
                          </ul>
                          <ul className={styles.results_lista}>
                            <li className={styles.results_lista_el}>
                              <p className={styles.results_tittle}>
                                Obrabiarka:
                              </p>
                              <p className={styles.results_value}>
                                {obrabiarka.length > 10
                                  ? obrabiarka.slice(0, 10) + "..."
                                  : obrabiarka.length === 0
                                  ? "-"
                                  : obrabiarka}
                              </p>
                            </li>
                            <li className={styles.results_lista_el}>
                              <p className={styles.results_tittle}>Operacja:</p>
                              <p className={styles.results_value}>
                                {numer_op.length === 0 ? "-" : numer_op + " - "}
                                {nazwa_op.length > 10
                                  ? nazwa_op.slice(0, 10) + "..."
                                  : nazwa_op.length === 0
                                  ? ""
                                  : nazwa_op}
                              </p>
                            </li>
                            <li className={styles.results_lista_el}>
                              <p className={styles.results_tittle}>Operator:</p>
                              <p className={styles.results_value}>
                                {operator.length === 0 ? "-" : operator}
                              </p>
                            </li>
                            <li className={styles.results_lista_el}>
                              <p className={styles.results_tittle}>
                                Wynik badania:
                              </p>
                              <p
                                className={
                                  test_result === "Zgodny"
                                    ? styles.results_value_green
                                    : test_result === "Niezgodny"
                                    ? styles.results_value_red
                                    : styles.results_value
                                }
                              >
                                {test_result}
                              </p>
                            </li>
                          </ul>
                        </div>
                      );
                    }
                  )}
                </div>
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
              {data.lab.map(
                ({
                  queue,
                  order,
                  index,
                  code,
                  name,
                  status,
                  wariant,
                  podwersja,
                  numer_zp,
                  status_zp,
                  obrabiarka,
                  nazwa_op,
                  numer_op,
                  ilosc,
                  pracochlonnosc_h,
                  bufor,
                  zgl_do_zdps,
                  ISIR_required,
                  operator,
                }) => {
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
                            <div className={styles.Lab_rowInfo_el}>
                              <p className={styles.Lab_order_infoTitle}>
                                Wariant:
                              </p>
                              <p className={styles.Lab_order_infoValue}>
                                {wariant}
                              </p>
                            </div>
                            <div className={styles.Lab_rowInfo_el}>
                              <p className={styles.Lab_order_infoTitle}>
                                Podwersja:
                              </p>
                              <p className={styles.Lab_order_infoValue}>
                                {podwersja}
                              </p>
                            </div>
                            <div className={styles.Lab_rowInfo_el}>
                              <p className={styles.Lab_order_infoTitle}>
                                Numer zlecenia:
                              </p>
                              <p className={styles.Lab_order_infoValue}>
                                {numer_zp}
                              </p>
                            </div>
                            <div className={styles.Lab_rowInfo_el}>
                              <p className={styles.Lab_order_infoTitle}>
                                Status Zlecenia:
                              </p>
                              <p className={styles.Lab_order_infoValue}>
                                {status_zp}
                              </p>
                            </div>
                            <div className={styles.Lab_rowInfo_el}>
                              <p className={styles.Lab_order_infoTitle}>
                                Obrabiarka:
                              </p>
                              <p className={styles.Lab_order_infoValue}>
                                {obrabiarka}
                              </p>
                            </div>
                            <div className={styles.Lab_rowInfo_el}>
                              <p className={styles.Lab_order_infoTitle}>
                                Operacja:
                              </p>
                              <p className={styles.Lab_order_infoValue}>
                                {numer_op} - {nazwa_op}
                              </p>
                            </div>
                            <div className={styles.Lab_rowInfo_el}>
                              <p className={styles.Lab_order_infoTitle}>
                                Ilość:
                              </p>
                              <p className={styles.Lab_order_infoValue}>
                                {ilosc}
                              </p>
                            </div>
                            <div className={styles.Lab_rowInfo_el}>
                              <p className={styles.Lab_order_infoTitle}>
                                Pracochłonność
                              </p>
                              <p className={styles.Lab_order_infoValue}>
                                {pracochlonnosc_h}
                              </p>
                            </div>
                            <div className={styles.Lab_rowInfo_el}>
                              <p className={styles.Lab_order_infoTitle}>
                                Bufor:
                              </p>
                              <p className={styles.Lab_order_infoValue}>
                                {bufor}
                              </p>
                            </div>
                            <div className={styles.Lab_rowInfo_el}>
                              <p className={styles.Lab_order_infoTitle}>
                                Zgłoszone do ZDPS
                              </p>
                              <p className={styles.Lab_order_infoValue}>
                                {zgl_do_zdps ? "Tak" : "Nie"}
                              </p>
                            </div>
                            <div className={styles.Lab_rowInfo_el}>
                              <p className={styles.Lab_order_infoTitle}>
                                Sprawozdanie:
                              </p>
                              {ISIR_required ? (
                                <p className={styles.Lab_order_infoValue_red}>
                                  Tak
                                </p>
                              ) : (
                                <p className={styles.Lab_order_infoValue}>
                                  Nie
                                </p>
                              )}
                            </div>
                            <div className={styles.Lab_rowInfo_el}>
                              <p className={styles.Lab_order_infoTitle}>
                                Operator:
                              </p>
                              <p className={styles.Lab_order_infoValue}>
                                {operator}
                              </p>
                            </div>
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
                }
              )}
            </ul>
          </div>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
};
