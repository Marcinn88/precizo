import styles from "./Nav.module.css";
import menuIco from "../images/menu-burger.svg";
import logoImg from "../images/Precizo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Nav = ({ selected, token }) => {
  const [navMenu, navMenuChange] = useState(false);

  const ref = () => {
    window.location.reload(false);
  };
  const openMenu = () => {
    navMenuChange(true);
  };

  const closeMenu = () => {
    navMenuChange(false);
  };
  return (
    <>
      <div className={styles.mainNav}>
        {navMenu && (
          <div className={styles.mainNav_Shadowbox} onClick={closeMenu}></div>
        )}
        {navMenu && (
          <ul className={styles.mainNav_menu}>
            <Link to="/precizo/">
              <li className={styles.mainNav_menuEl}>MENU</li>
            </Link>
            <Link to="/precizo/orders/">
              <li className={styles.mainNav_menuEl}>ZLECENIA</li>
            </Link>
            <li className={styles.mainNav_menuEl}>INFORMACJE</li>
            <li className={styles.mainNav_menuEl}>POMOC</li>
            <li className={styles.mainNav_menuEl_last}>WYLOGUJ</li>
          </ul>
        )}
        <Link to="/precizo/">
          <img className={styles.mainNav_logoImg} src={logoImg} alt="logo" />
        </Link>
        <div className={styles.mainNav_rightSide}>
          <ul className={styles.mainNav_list}>
            <li className={styles.mainNav_el_title}>Zalogowany jako:</li>
            <li className={styles.mainNav_el}>M. Piórkowski</li>
          </ul>
          <img
            className={styles.mainNav_menuIco}
            src={menuIco}
            alt="ikona menu"
            onClick={openMenu}
          />
        </div>
      </div>
    </>
  );
};
