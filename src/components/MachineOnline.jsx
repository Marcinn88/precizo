import { Nav } from "./Nav";
import styles from "./MachineOnline.module.css";
import React from "react";


import data from "../JSON/ScoutAPI_machines_Online.json";
import { nanoid } from "nanoid";

const dane = data.data;

export const MachineOnline = ({ token }) => {

    const onOpenSite = () =>{
        console.log("dane",dane)
    }

    onOpenSite()

  return (
    <>
      <Nav />
      <div className={styles.Machines_wrapper}>
            {dane.map(({
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
                total_quantity
        })=>{
                return(
                    <div className={styles.Machines_El} key={nanoid()}>
                        <div className={styles.Machine_line}>
                            <p className={styles.Machine_title}> Indeks: </p>
                            <p className={styles.Machine_value}> {machine_number} </p>
                        </div>
                        <div className={styles.Machine_line}>
                            <p className={styles.Machine_title}> Nazwa: </p>
                            <p className={styles.Machine_value}> {machine_name} </p>
                        </div>
                        <div className={styles.Machine_line}>
                            <p className={styles.Machine_title}> Zlecenie: </p>
                            <p className={styles.Machine_value}> {order} </p>
                        </div>
                        <div className={styles.Machine_line}>
                            <p className={styles.Machine_title}> Operacja: </p>
                            <p className={styles.Machine_value}> {operation_number} - {operation_name} </p>
                        </div>
                        <div className={styles.Machine_line}>
                            <p className={styles.Machine_title}> Operator: </p>
                            <p className={styles.Machine_value}> {operator} </p>
                        </div>
                        <div className={styles.Machine_line}>
                            <p className={styles.Machine_title}> Rozpoczęcie: </p>
                            <p className={styles.Machine_value}> {start_date} {start_time} </p>
                        </div>
                        <div className={styles.Machine_line}>
                            <p className={styles.Machine_title}> Czas: </p>
                            <p className={styles.Machine_value}> {program_time_sec} </p>
                        </div>
                        <div className={styles.Machine_line}>
                            <p className={styles.Machine_title}> Wykonano: </p>
                            <p className={styles.Machine_value}> {counter} / {total_quantity} </p>
                        </div>
                    </div>
                    )
                })}
        </div>
    </>
  );
};
