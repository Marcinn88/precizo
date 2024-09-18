import { Nav } from "./Nav";
import styles from "./MachineOnline.module.css";
import 'react-notifications/lib/notifications.css';
import React, { useState } from "react";
import { nanoid } from "nanoid";


import data from "../JSON/ScoutAPI_machines_Online.json";
import options from "../JSON/config.json"

import runner from "../images/runner.svg"
import status from "../images/status.svg"
import area from "../images/area.svg"
import sort from "../images/sort.svg"

const dane = data.data;
const filterOptions = options.options
const sortOptions = options.sortOptions

export const MachineOnline = ({ token }) => {

    const [scrollMenu, setScrollMenu] = useState()
    const [scrollMenuSort, setScrollMenuSort] = useState()
    const [filter, setFilter] = useState(0)
    const [sortState, setSortState] = useState(0)

    const closeScrollMenu = () => {
        setScrollMenu(false)
    }

    const openScrollMenu = () => {
        setScrollMenu(true)
    }

    const closeScrollMenuSort = () => {
        setScrollMenuSort(false)
    }

    const openScrollMenuSort = () => {
        setScrollMenuSort(true)
    }

    // const onOpenSite = () =>{
    //     console.log("dane",dane)
    //     const filtrowanie = dane.filter(({zone})=>{return zone == 1})
    //     console.log("filtrowane dane", filtrowanie)
    //     console.log("opcje", filterOptions)
    //     console.log("data loaded...")
    // }
    // onOpenSite()

    const timeChanger = (total_time) => {
        var sec_num = parseInt(total_time, 10);
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    }

    const endTime = (tj, count, quant) => {
        const time = parseInt(tj)
        const counter = parseInt(count)
        const quantity = parseInt(quant)        
        const part_left = quantity - counter
        const total_sec = part_left * time
        return total_sec

    }

    const onFilter = (e) => {
        e == "Wszystkie" ? setFilter(0) : setFilter(e)
        closeScrollMenu()
    }


  return (
    <>
      <Nav />
      <div className={styles.Machines_FilterWrapper}>

            <div  className={styles.Machines_FilterEl}>
                <div 
                className={styles.Machines_FilterEl_container}
                onClick={openScrollMenu}>
                    <img className={styles.Machine_filterIco} src={area} alt=""></img>
                    <p className={styles.Machine_filterTitle}> Obszar </p>
                </div>
                    {scrollMenu &&
                    <>
                        <div className={styles.Filter_scrollMenu}>
                            {filterOptions
                            .map(({ filtr })=>{ return(
                                        <p key={nanoid()} 
                                        className={styles.Filter_scrollMenu_EL} 
                                        onClick={(e)=>{
                                            onFilter(filtr);   
                                        }}>
                                            {filtr}
                                        </p>            
                                )
                            })}
                        </div>
                            <div className={styles.Filter_scrollMenu_Shadow} onClick={closeScrollMenu}></div>
                            </>
                        }
            </div>
            <div  className={styles.Machines_FilterEl}>
                <div 
                className={styles.Machines_FilterEl_container}
                onClick={openScrollMenuSort}>
                    <img className={styles.Machine_filterIco} src={sort} alt=""></img>
                    <p className={styles.Machine_filterTitle}> Sortuj </p>
                </div>
                    {scrollMenuSort &&
                    <>
                        <div className={styles.Filter_scrollMenu}>
                            {sortOptions
                            .map(({ sort })=>{ return(
                                        <p key={nanoid()} 
                                        className={styles.Filter_scrollMenu_EL} 
                                        // onClick={(e)=>{onFilter(sort)}}
                                        >
                                            {sort}
                                        </p>            
                                )
                            })}
                        </div>
                            <div className={styles.Filter_scrollMenu_Shadow} onClick={closeScrollMenuSort}></div>
                            </>
                        }
            </div>
        </div>
      <div className={styles.Machines_wrapper}>
            {dane
            .filter(({zone})=>{return filter == 0 ? zone : zone == filter})
            .sort((a, b) => endTime(a.order_tj, a.counter, a.total_quantity) - endTime(b.order_tj, b.counter, b.total_quantity))
            .map(({
                machine_number, 
                machine_name, 
                order, 
                operation_name, 
                operation_number,
                operator,
                start_date,
                start_time,
                program_time_sec,
                counter,
                total_quantity,
                priorytet,
                status_change,
                order_tj,
                order_status
        })=>{
                return(
                    <div className={
                        order_status == "1-PPP" ? styles.Machines_El_ppp:
                        order_status == "2-ZDPS" ? styles.Machines_El_zdps:
                        order_status == "3-REWIZJA" ? styles.Machines_El_rew:
                        order_status == "4-NADZOROWANY" ? styles.Machines_El_nadzor:
                        styles.Machines_El
                    } key={nanoid()}>
                        <div className={styles.Machine_header}>
                            <div className={styles.Machine_main_line}>
                                <p className={styles.Machine_value_main}> {machine_number} </p>
                                <div className={styles.Machine_img_container}>
                                    {status_change&&<img className={styles.Machine_ico} src={status} alt=""></img>}
                                    {priorytet&&<img className={styles.Machine_ico} src={runner} alt=""></img>}
                                </div>
                            </div>
                            <div className={styles.Machine_line}>
                                <p className={styles.Machine_value_submain}> {machine_name} </p>
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
                                <p className={styles.Machine_title}> Plan. koniec: </p>
                                <p className={styles.Machine_value}> {timeChanger(endTime(order_tj, counter, total_quantity))} </p>
                            </div>
                            {/* <div className={styles.Machine_line}>
                                <p className={styles.Machine_title}> Czas: </p>
                                <p className={styles.Machine_value}> {program_time_sec} </p>
                            </div> */}
                        </div>
                        <div className={styles.Machine_line}>
                            <p className={styles.Machine_counter}> {counter} / {total_quantity} </p>
                        </div>
                    </div>
                    )
                })}
        </div>
{/* <p>{filter}</p> */}
    </>
  );
};
