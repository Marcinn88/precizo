import styles from "./Lab.module.css";
import { Nav } from "./Nav";
import { LoginPage } from "./LoginPage";

export const Lab = ({ token }) => {
  return (
    <>
      {token === "admin" ? (
        <>
          <Nav />

          <div className={styles.Lab_container}>
            <ul className={styles.Lab_table}>
              <li className={styles.Lab_rowC}>
                <ul className={styles.Lab_header_row}>
                  <li className={styles.el_header_no}>Kolejka</li>
                  <li className={styles.el_header_zb}>
                    Numer zlecenia badania
                  </li>
                  <li className={styles.el_header_id}>Indeks Wyrobu</li>
                  <li className={styles.el_header_kod}>Kod</li>
                  <li className={styles.el_header_name}>Nazwa wyrobu</li>
                  <li className={styles.el_header_status}>Status</li>
                </ul>
              </li>
              <li className={styles.Lab_rowC}>
                <ul className={styles.Lab_row}>
                  <li className={styles.el_no}>1</li>
                  <li className={styles.el_zb}>ZB01234/2024/1</li>
                  <li className={styles.el_id}>W05123</li>
                  <li className={styles.el_kod}>ZP</li>
                  <li className={styles.el_name}>Wał HXE8111555</li>
                  <li className={styles.el_status}>W trakcie</li>
                </ul>
              </li>
              <li className={styles.Lab_rowC}>
                <ul className={styles.Lab_row}>
                  <li className={styles.el_no}>2</li>
                  <li className={styles.el_zb}>ZB01224/2024/2</li>
                  <li className={styles.el_id}>W06203</li>
                  <li className={styles.el_kod}>ZP</li>
                  <li className={styles.el_name}>Sworzeń 1231555</li>
                  <li className={styles.el_status}>Kolejka</li>
                </ul>
              </li>
              <li className={styles.Lab_rowC}>
                <ul className={styles.Lab_row}>
                  <li className={styles.el_no}>3</li>
                  <li className={styles.el_zb}>ZB02224/2024/1</li>
                  <li className={styles.el_id}>W064103</li>
                  <li className={styles.el_kod}>ZP</li>
                  <li className={styles.el_name}>Sworzeń 1231555</li>
                  <li className={styles.el_status}>Kolejka</li>
                </ul>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
};
