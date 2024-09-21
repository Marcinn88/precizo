import { Nav } from "./Nav";
import styles from "./MachineOnline.module.css";
import "react-notifications/lib/notifications.css";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import data from "../JSON/ScoutAPI_machines_Online.json";
import options from "../JSON/config.json";
import dataTasks from "../JSON/ScoutAPI_machines_Tasks.json"

import runner from "../images/runner.svg";
import status from "../images/status.svg";
import area from "../images/area.svg";
import sort from "../images/sort.svg";
import machineIco from "../images/production.svg";
import tasksIco from "../images/tasks.svg";

const MINUTE_MS = 60000;

const dane = data.data;
const tasks = dataTasks.tasks
const filterOptions = options.options;
const sortOptions = options.sortOptions;

export const MachineOnline = ({ token }) => {
  const [scrollMenu, setScrollMenu] = useState();
  const [scrollMenuSort, setScrollMenuSort] = useState();
  const [filter, setFilter] = useState(0);
  const [sortState, setSortState] = useState(0);
  const [activeCard, setActiveCard] = useState("Machines");
  const [time, setTime] = useState(1)

  const ref = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Logs every minute");
      // ref();
      const data = new Date()
      setTime(data)
    }, MINUTE_MS);

    return () => clearInterval(interval); // The unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  //   const [timeValues, setTimeValues] = useState({
  //     order: {
  //       orderNo: "",
  //       orderTimes: {
  //         startDate: 0,
  //         startDateTS: 0,
  //         planTime: 0,
  //         planQuantity: 0,
  //       },
  //     },
  //   });

  const closeScrollMenu = () => {
    setScrollMenu(false);
  };
  const openScrollMenu = () => {
    setScrollMenu(true);
  };
  const closeScrollMenuSort = () => {
    setScrollMenuSort(false);
  };
  const openScrollMenuSort = () => {
    setScrollMenuSort(true);
  };

  const onOpenSite = () => {
    // console.log("dane", dane);
    // const filtrowanie = dane.filter(({zone})=>{return zone == 1})
    // console.log("filtrowane dane", filtrowanie)
    // console.log("opcje", filterOptions)
    // console.log("data loaded...")
  };
  onOpenSite();

  const timeChanger = (total_time) => {
    var sec_num = parseInt(total_time, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
  };

  const endTime = (tj, count, quant) => {
    const time = parseInt(tj);
    const counter = parseInt(count);
    const quantity = parseInt(quant);
    const part_left = quantity - counter;
    const total_sec = part_left * time;
    return total_sec;
  };

  const onFilter = (e) => {
    e == "Wszystkie" ? setFilter(0) : setFilter(e);
    closeScrollMenu();
  };

  const fromStringToDate = (date, time) => {
    const year = parseInt(date.slice(6, 10));
    const month = parseInt(date.slice(3, 5)) - 1;
    const day = parseInt(date.slice(0, 2));
    const hours = parseInt(time.slice(0, 2)) - 2;
    const minutes = parseInt(time.slice(3, 5));
    const seconds = parseInt(time.slice(6, 8));
    const data = new Date(
      Date.UTC(year, month, day, hours, minutes, seconds, 0)
    );
    return data;
  };

  const fromDatetoTS = (data) => {
    const dateTS = Math.floor(new Date(data).getTime() / 1000.0);
    return dateTS;
  };

  return (
    <>
      <Nav />
      {/* Górna belka */}
      <div className={styles.Machines_TopMenu_Wrapper}>
        <div
          className={
            activeCard == "Machines"
              ? styles.TopMenu_El_Active
              : styles.TopMenu_El
          }
          onClick={() => {
            setActiveCard("Machines");
          }}
        >
          <img className={styles.TopMenu_El_img} src={machineIco}></img>
          <p className={styles.TopMenu_El_title}>Maszyny</p>
        </div>
        <div
          className={
            activeCard == "Tasks" ? styles.TopMenu_El_Active : styles.TopMenu_El
          }
          onClick={() => {
            setActiveCard("Tasks");
          }}
        >
          <img className={styles.TopMenu_El_img} src={tasksIco}></img>
          <p className={styles.TopMenu_El_title}>Zadania</p>
        </div>
      </div>
      {/* Karty z maszynami */}
      {activeCard == "Machines" && time != 0 ? (
        <div className={styles.CardsWrapper}>
          {/* Filtry kart */}
          <div className={styles.Machines_FilterWrapper}>
            <div className={styles.Machines_FilterEl}>
              <div
                className={styles.Machines_FilterEl_container}
                onClick={openScrollMenu}
              >
                <img
                  className={styles.Machine_filterIco}
                  src={area}
                  alt=""
                ></img>
                <p className={styles.Machine_filterTitle}> Obszar </p>
              </div>
              {scrollMenu && (
                <>
                  <div className={styles.Filter_scrollMenu}>
                    {filterOptions.map(({ filtr }) => {
                      return (
                        <p
                          key={nanoid()}
                          className={styles.Filter_scrollMenu_EL}
                          onClick={(e) => {
                            onFilter(filtr);
                          }}
                        >
                          {filtr}
                        </p>
                      );
                    })}
                  </div>
                  <div
                    className={styles.Filter_scrollMenu_Shadow}
                    onClick={closeScrollMenu}
                  ></div>
                </>
              )}
            </div>
            <div className={styles.Machines_FilterEl}>
              <div
                className={styles.Machines_FilterEl_container}
                onClick={openScrollMenuSort}
              >
                <img
                  className={styles.Machine_filterIco}
                  src={sort}
                  alt=""
                ></img>
                <p className={styles.Machine_filterTitle}> Sortuj </p>
              </div>
              {scrollMenuSort && (
                <>
                  <div className={styles.Filter_scrollMenu}>
                    {sortOptions.map(({ sort }) => {
                      return (
                        <p
                          key={nanoid()}
                          className={styles.Filter_scrollMenu_EL}
                          // onClick={(e)=>{onFilter(sort)}}
                        >
                          {sort}
                        </p>
                      );
                    })}
                  </div>
                  <div
                    className={styles.Filter_scrollMenu_Shadow}
                    onClick={closeScrollMenuSort}
                  ></div>
                </>
              )}
            </div>
          </div>

          <div>
            {/* <button
              onClick={() => {
                dane.map(
                  ({
                    order,
                    start_date,
                    start_time,
                    order_tpz,
                    order_tj,
                    total_quantity,
                    counter,
                  }) => {
                    setTimeValues({
                      ...timeValues,
                      order: {
                        orderNo: order,
                        orderTimes: {
                          startDate: fromStringToDate(start_date, start_time),
                          startDateTS: fromDatetoTS(
                            fromStringToDate(start_date, start_time)
                          ),
                          planTime:
                            parseInt(order_tpz) +
                            (parseInt(total_quantity) - parseInt(counter)) *
                              parseInt(order_tj),
                          planQuantity: 0,
                        },
                      },
                    });
                  }
                );
              }}
            >
              Create
            </button>
            <button
              onClick={() => {
                console.log(timeValues);
              }}
            >
              Log
            </button> */}
          </div>
          {/* Karty maszyn */}
          <div className={styles.Machines_wrapper}>
            {dane
              .filter(({ zone }) => {
                return filter == 0 ? zone : zone == filter;
              })
                .sort(
                  (a, b) =>
                    endTime(a.order_tj, a.counter, a.total_quantity) -
                    endTime(b.order_tj, b.counter, b.total_quantity)
                )
              .map(
                ({
                  machine_number,
                  machine_name,
                  order,
                  operator,
                  start_date,
                  start_time,
                  program_time_sec,
                  counter,
                  total_quantity,
                  priorytet,
                  status_change,
                  order_tj,
                  order_tpz,
                  order_status,
                }) => {

                  const dateString = fromStringToDate(start_date, start_time).toString()
                  const startTS = fromDatetoTS(
                    fromStringToDate(start_date, start_time)
                  );

                  const nowTS = fromDatetoTS(new Date());

                  const totalPlanTime =
                    parseInt(order_tpz) +
                    parseInt(total_quantity) * parseInt(order_tj);

                  const planTime =
                    parseInt(order_tpz) +
                    (parseInt(total_quantity) - parseInt(counter)) *
                      parseInt(order_tj);

                  const workTime = nowTS - startTS;

                  const planQuantityCounter = () => {
                    if (workTime <= order_tpz) {
                      const planQuantity = 0;
                      return planQuantity;
                    }
                    const planQuantity = Math.ceil(
                      (workTime - order_tpz - order_tj) / order_tj
                    );
                    return planQuantity;
                  };

                  const percenOfQuantity = (value) => {
                    const percent = (value * 100) / total_quantity + "%";
                    if (percent > 100) {
                      const result = 100 + "%";
                      return result;
                    }
                    const result = percent;
                    return result;
                  };
                  return (
                    <div
                      className={
                        order_status == "1-PPP"
                          ? styles.Machines_El_ppp
                          : order_status == "2-ZDPS"
                          ? styles.Machines_El_zdps
                          : order_status == "3-REWIZJA"
                          ? styles.Machines_El_rew
                          : order_status == "4-NADZOROWANY"
                          ? styles.Machines_El_nadzor
                          : styles.Machines_El
                      }
                      key={nanoid()}
                    >
                      <div className={styles.Machine_header}>
                        <div className={styles.Machine_main_line}>
                          <p className={styles.Machine_value_main}>
                            {machine_number}
                          </p>
                          <div className={styles.Machine_img_container}>
                            {status_change && (
                              <img
                                className={styles.Machine_ico}
                                src={status}
                                alt=""
                              ></img>
                            )}
                            {priorytet && (
                              <img
                                className={styles.Machine_ico}
                                src={runner}
                                alt=""
                              ></img>
                            )}
                          </div>
                        </div>
                        <div className={styles.Machine_line}>
                          <p className={styles.Machine_value_submain}>
                            {machine_name}
                          </p>
                        </div>
                      </div>
                      <div className={styles.Machine_body}>
                        <div className={styles.Machine_line}>
                          <p className={styles.Machine_order}> {order} </p>
                        </div>
                        <div className={styles.Machine_line_op}>
                          <p className={styles.Machine_title}> Zalogowany: </p>
                          <p className={styles.Machine_value}> {operator} </p>
                        </div>
                        <div className={styles.Machine_line}>
                          <p className={styles.Machine_title}> Rozpoczęcie: </p>
                          <p className={styles.Machine_value}> {start_time} </p>
                        </div>
                        <div className={styles.Machine_line}>
                          <p className={styles.Machine_title}>Plan. koniec:</p>
                          <p className={styles.Machine_value}>
                            {timeChanger(
                              endTime(order_tj, counter, total_quantity)
                            )}
                          </p>
                        </div>
                        {/* <div className={styles.Machine_line}>
                          <p className={styles.Machine_title}> Start Date: </p>
                          <p className={styles.Machine_value}> {dateString} </p>
                        </div>
                        <div className={styles.Machine_line}>
                          <p className={styles.Machine_title}> Start TS: </p>
                          <p className={styles.Machine_value}> {startTS} </p>
                        </div>
                        <div className={styles.Machine_line}>
                          <p className={styles.Machine_title}> Teraz TS: </p>
                          <p className={styles.Machine_value}> {nowTS} </p>
                        </div>
                        <div className={styles.Machine_line}>
                          <p className={styles.Machine_title}> Czas plan s: </p>
                          <p className={styles.Machine_value}>
                            {totalPlanTime}
                          </p>
                        </div>
                        <div className={styles.Machine_line}>
                          <p className={styles.Machine_title}>
                            Od start do Teraz
                          </p>
                          <p className={styles.Machine_value}>
                            {totalPlanTime - workTime}
                          </p>
                        </div> */}
                        <div className={styles.Machine_line}>
                          <p className={styles.Machine_title}>
                            Planowana sztuka:
                          </p>
                          <p className={styles.Machine_value}>
                            {planQuantityCounter()>total_quantity?total_quantity:planQuantityCounter()}
                          </p>
                        </div>
                        <div className={styles.Machine_line}>
                          <p className={styles.Machine_counter}>
                            {counter} / {total_quantity}
                          </p>
                        </div>
                        <div className={styles.Machine_line}>
                          <div className={styles.fullBar}>
                            <div
                              style={{ width: percenOfQuantity(counter) }}
                              className={styles.valueBar}
                            ></div>
                            <div
                              style={{
                                width: percenOfQuantity(planQuantityCounter()),
                              }}
                              className={styles.valuePlanBar}
                            ></div>
                          </div>
                        </div>
                        <div className={styles.Machine_line}>
                          <p className={styles.Machine_title}>Status:</p>
                          {planQuantityCounter() > counter ? (
                            <p className={styles.Machine_value}>Spóźnienie</p>
                          ) : (
                            <p className={styles.Machine_value}>W trakcie</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      ):
      (
        <div className={styles.CardsWrapper}>
        {/* Karty maszyn */}
        <div className={styles.Machines_wrapper}>
              <div className={styles.Tasks_wrapper}>
                <p className={styles.Tasks_Title}>Lista zadań leadera.</p>
                {tasks.map(({title, task, everyDayTask})=>{return(
                  <>
                    <div className={styles.Tasks_List}>
                      <div className={styles.Task_El}>
                        <p className={styles.Task_El_Title}>{title}</p>
                        <p className={styles.Task_El_Subtitle}>{task}</p>
                        <button className={styles.Task_El_Btn}>Potwierdź</button>
                      </div>
                    </div>
                  </>
                )})}
              </div>
        </div>
      </div>
      )
      }
    </>
  );
};
