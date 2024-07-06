import styles from "./Order.module.css";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

export const Order = ({
  token,
  numer,
  nazwa,
  indeks,
  wariant,
  podwersja,
  status,
  obrabiarka,
  nazwa_op,
  numer_op,
  ilosc,
  bufor,
  zgl_do_zdps,
}) => {
  return (
    <>
      <Link to="/precizo/dashboard/">
        <div className={styles.OrderWrapper}>
          <div className={styles.OrderHeader}>
            <p className={styles.OrderTitle}>Numer zlecenia:</p>
            <p className={styles.OrderNumber}>{numer}</p>
          </div>
          <div className={styles.OrderParameters}>
            <div className={styles.OrderParameter}>
              <p className={styles.OrderParTitle}>Nazwa:</p>
              <p className={styles.OrderParValue}>{nazwa}</p>
            </div>
            <div className={styles.OrderParameter}>
              <p className={styles.OrderParTitle}>Index:</p>
              <p className={styles.OrderParValue}>{indeks}</p>
            </div>
            <div className={styles.OrderParameter}>
              <p className={styles.OrderParTitle}>Wariant:</p>
              <p className={styles.OrderParValue}>{wariant}</p>
            </div>
            <div className={styles.OrderParameter}>
              <p className={styles.OrderParTitle}>Podwersja:</p>
              <p className={styles.OrderParValue}>{podwersja}</p>
            </div>
            <div className={styles.OrderParameter}>
              <p className={styles.OrderParTitle}>Status:</p>
              <p className={styles.OrderParValue}>{status}</p>
            </div>
            <div className={styles.OrderParameter}>
              <p className={styles.OrderParTitle}>Obrabiarka:</p>
              <p className={styles.OrderParValue}>{obrabiarka}</p>
            </div>
            <div className={styles.OrderParameter}>
              <p className={styles.OrderParTitle}>Operacja:</p>
              <p className={styles.OrderParValue}>
                {nazwa_op} - {numer_op}
              </p>
            </div>
            <div className={styles.OrderParameter}>
              <p className={styles.OrderParTitle}>Ilość:</p>
              <p className={styles.OrderParValue}>{ilosc}</p>
            </div>
            <div className={styles.OrderParameter}>
              <p className={styles.OrderParTitle}>Bufor:</p>
              <p className={styles.OrderParValue}>{bufor}</p>
            </div>
            <div className={styles.OrderParameter}>
              <p className={styles.OrderParTitle}>Zgł. do zatw. ZDPS:</p>
              <p className={styles.OrderParValue}>
                {zgl_do_zdps ? "Tak" : "Nie"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
