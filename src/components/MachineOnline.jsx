import { Nav } from "./Nav";
import styles from "./MachineOnline.module.css";
import "react-notifications/lib/notifications.css";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import data from "../JSON/ScoutAPI_machines_Online.json";
import options from "../JSON/config.json";
import dataTasks from "../JSON/ScoutAPI_machines_Tasks.json";

import runner from "../images/runner.svg";
import status from "../images/status.svg";
import area from "../images/area.svg";
import sort from "../images/sort.svg";
import machineIco from "../images/production.svg";
import tasksIco from "../images/tasks.svg";
import acceptIco from "../images/accept.svg";

const MINUTE_MS = 60000;

const dane = data.data;
const tasks = dataTasks.tasks;
const filterOptions = options.options;
const sortOptions = options.sortOptions;

export const MachineOnline = ({ token }) => {
  const [scrollMenu, setScrollMenu] = useState();
  const [scrollMenuSort, setScrollMenuSort] = useState();
  const [filter, setFilter] = useState(0);
  const [sortState, setSortState] = useState(0);
  const [activeCard, setActiveCard] = useState("Machines");
  const [time, setTime] = useState(1);
  const [taskState, setTaskState] = useState(tasks);

  const ref = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Logs every minute");
      // ref();
      const data = new Date();
      setTime(data);
    }, MINUTE_MS);

    return () => clearInterval(interval); // The unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  // useEffect(() => {
  //   return () => console.log(tasks);
  // }, []);

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
  // onOpenSite();

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

  const getNowDate = () => {
    const date = new Date();

    const getNowDay = () => {
      if (date.getDate() < 10) {
        const day = "0" + date.getDate();
        return day;
      }
      const day = date.getDate();
      return day;
    };

    const getNowMonth = () => {
      if (date.getMonth() < 10) {
        const calcMonth = date.getMonth() + 1;
        const month = "0" + calcMonth;
        return month;
      }
      const month = date.getMonth() + 1;
      return month;
    };
    const year = date.getFullYear();
    return getNowDay() + "." + getNowMonth() + "." + year;
  };

  const getNowTime = () => {
    const date = new Date();

    const getNowHours = () => {
      if (date.getHours() < 10) {
        const hours = "0" + date.getHours();
        return hours;
      }
      const hours = date.getHours();
      return hours;
    };
    const getNowMinutes = () => {
      if (date.getMinutes() < 10) {
        const minutes = "0" + date.getMinutes();
        return minutes;
      }
      const minutes = date.getMinutes();
      return minutes;
    };
    const getNowSeconds = () => {
      if (date.getSeconds() < 10) {
        const seconds = "0" + date.getSeconds();
        return seconds;
      }
      const seconds = date.getSeconds();
      return seconds;
    };
    return getNowHours() + ":" + getNowMinutes() + ":" + getNowSeconds();
  };

  const dateString = (start_date, start_time) => {
    const datestr = fromStringToDate( start_date, start_time ).toString();
    return datestr
  }
  
  const startTS = (start_date, start_time) => {
    const startts = fromDatetoTS(fromStringToDate(start_date, start_time))
    return startts
  }

  const nowTS = () => {
    const now = fromDatetoTS(new Date())
    return now
  };
  
  const workTime = (start_date, start_time) => {
    const worktime = nowTS(start_date, start_time) - startTS(start_date, start_time)
    return worktime
  };

  const totalPlanTime = (order_tpz, total_quantity, order_tj) => {
  const totalplantime = 
  parseInt(order_tpz) +
  parseInt(total_quantity) * parseInt(order_tj);
    return totalplantime
}
  const planTime = (order_tpz, total_quantity, counter, order_tj) =>{
  const plantime = parseInt(order_tpz) + (parseInt(total_quantity) - parseInt(counter)) * parseInt(order_tj)
    return plantime
}
  
  const planQuantityCounter = (order_tpz, order_tj, total_quantity, start_date, start_time) => {
    if (workTime(start_date, start_time) <= order_tpz) {
      const planQuantity = 0;
      return planQuantity;
    }
    const planQuantity = Math.ceil(
      (workTime(start_date, start_time) - order_tpz - order_tj) / order_tj
    );
    if (planQuantity > total_quantity) {
      return parseInt(total_quantity)
    }
    return planQuantity;
  };

  const percenOfQuantity = (value, total_quantity) => {
    const calcPercent = (value * 100) / total_quantity 
    const percent = calcPercent+ "%";
    if (percent > 100) {
      const result = 100 + "%";
      return result;
    }
    const result = percent;
    return result;
  };

  const lateTime = (counter, order_tj, order_tpz, total_quantity, start_date, start_time) => {
    const plan = planQuantityCounter(order_tpz, order_tj, total_quantity, start_date, start_time)
    if (plan <= counter) {
      const late = 0
      return late
    }
    const late = (plan - counter) * order_tj
    return late
  }


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
                    {sortOptions.map(({ sort, value }) => {
                      return (
                        <p
                          key={nanoid()}
                          className={styles.Filter_scrollMenu_EL}
                          onClick={()=>{
                            setSortState(value);
                            closeScrollMenuSort();
                          }}
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

          </div>
          {/* Karty maszyn */}
          <div className={styles.Machines_wrapper}>
            {dane
              .filter(({ zone }) => {
                return filter == 0 ? zone : zone == filter;
              })
              
              .sort(
                (a, b) => 
                  {
                    if (sortState == 0) {
                    return endTime(a.order_tj, a.counter, a.total_quantity) - endTime(b.order_tj, b.counter, b.total_quantity)
                    }{
                    return lateTime(b.counter, b.order_tj, b.order_tpz, b.total_quantity, b.start_date, b.start_time) - lateTime(a.counter, a.order_tj, a.order_tpz, a.total_quantity, a.start_date, a.start_time)
                  }
                  }
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
                          <p className={styles.Machine_title}> Spóźnienie: </p>
                          <p className={styles.Machine_value}> {lateTime(counter, order_tj, order_tpz, total_quantity, start_date, start_time)} s </p>
                        </div>
                        <div className={styles.Machine_line}>
                          <p className={styles.Machine_title}>
                            Planowana sztuka:
                          </p>
                          <p className={styles.Machine_value}>
                            {planQuantityCounter(order_tpz, order_tj, total_quantity, start_date, start_time) > total_quantity
                              ? total_quantity
                              : planQuantityCounter(order_tpz, order_tj, total_quantity, start_date, start_time)}
                          </p>
                        </div>
                        <div className={styles.Machine_line}>
                          <p className={styles.Machine_counter}>
                            {counter} / {total_quantity}
                          </p>
                        </div>
                        <div className={styles.Machine_line}>
                          <div className={styles.fullBar}>
                              <div className={styles.Bar_container}>
                                <div className={styles.background_bar}>
                                </div>
                                <div style={{ width: percenOfQuantity(counter, total_quantity) }} className={styles.front_bar}>
                                </div>
                              </div>
                              <div className={styles.Bar_container}>
                                <div className={styles.background_bar}>
                                </div>
                                <div style={{ width: percenOfQuantity(planQuantityCounter(order_tpz, order_tj, total_quantity, start_date, start_time),total_quantity) }} className={styles.front_plan_bar}>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.Machine_line}>
                          <p className={styles.Machine_title}>Status:</p>
                          {planQuantityCounter(order_tpz, order_tj, total_quantity, start_date, start_time) > counter ? (
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
      ) : (
        <div className={styles.CardsWrapper}>
          {/* Zadania Leadera */}
          <div className={styles.Machines_wrapper}>
            <div className={styles.Tasks_wrapper}>
              <p className={styles.Tasks_Title}>Lista zadań leadera.</p>
              <div className={styles.Tasks_List}>
                {taskState.map(
                  (
                    { title, task, finish, everyDayTask, date, time },
                    index
                  ) => {
                    return (
                      <div
                        className={
                          finish !== true
                            ? styles.Task_El
                            : styles.Task_El_Finish
                        }
                        key={index}
                      >
                        {finish && (
                          <img
                            className={styles.Task_El_ico}
                            src={acceptIco}
                          ></img>
                        )}
                        <p
                          className={
                            finish !== true
                              ? styles.Task_El_Title
                              : styles.Task_El_Title_Finish
                          }
                        >
                          {title}
                        </p>
                        {finish && (
                          <p className={styles.Task_El_Note}>
                            (Wykonano: {date}, {time})
                          </p>
                        )}
                        <p
                          className={
                            finish !== true
                              ? styles.Task_El_Subtitle
                              : styles.Task_El_Subtitle_Finish
                          }
                        >
                          {task}
                        </p>
                        {finish !== true ? (
                          <button
                            onClick={() => {
                              const updatedTaskState = [...taskState];
                              updatedTaskState[index] = {
                                ...updatedTaskState[index],
                                finish: true,
                                date: getNowDate(),
                                time: getNowTime(),
                              };
                              setTaskState(updatedTaskState);
                            }}
                            className={styles.Task_El_Btn}
                          >
                            Potwierdź
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              const updatedTaskState = [...taskState];
                              updatedTaskState[index] = {
                                ...updatedTaskState[index],
                                finish: false,
                                date: "",
                                time: "",
                              };
                              setTaskState(updatedTaskState);
                            }}
                            className={styles.Task_El_Btn_Finish}
                          >
                            Cofnij
                          </button>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
              <button
                onClick={() => {
                  alert("Tu pojawi się okno dodawania nowego zadania.");
                }}
                className={styles.Task_Btn}
              >
                Dodaj nowe zadanie
              </button>
            </div>
          </div>
        </div>
      )}

<div>
  <p>{sortState}</p>
</div>
    </>
  );
};
