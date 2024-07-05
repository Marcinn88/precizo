import styles from "./Nav.module.css";
import menuIco from "../images/menu-burger.svg";
import logoImg from "../images/Precizo.png";
export const Nav = ({ selected, token }) => {
  return (
    <>
      <div className={styles.mainNav}>
        <img className={styles.mainNav_logoImg} src={logoImg} alt="logo" />
        <div className={styles.mainNav_rightSide}>
          <ul className={styles.mainNav_list}>
            <li className={styles.mainNav_el_title}>Zalogowany jako:</li>
            <li className={styles.mainNav_el}>M. Piórkowski</li>
          </ul>
          <img
            className={styles.mainNav_menuIco}
            src={menuIco}
            alt="ikona menu"
          />
        </div>
        {/* <h2 className={styles.mainNavHeader}>nawigacja</h2> */}
      </div>
    </>
  );
};
