import styles from "./Hero.module.css";
import { MenuEl } from "./MenuEl";
import { Nav } from "./Nav";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

import list from "../images/list.svg";
import waste from "../images/waste.svg";
import fork from "../images/forklift.svg";
import hammer from "../images/hammer.svg";
import chart from "../images/chart.svg";
import cart from "../images/cart.svg";
import profile from "../images/profile.svg";
import inspection from "../images/inspection.svg";
import { LoginPage } from "./LoginPage";

export const Hero = ({ token }) => {
  return (
    <>
      {token === "admin" ? (
        <>
          <Nav />
          <div className={styles.Hero_wrapper}>
            <Link to="/precizo/orders/">
              <MenuEl key={nanoid()} obraz={list} nazwa="Zlecenia" />
            </Link>
            <Link to="/precizo/">
              <MenuEl key={nanoid()} obraz={waste} nazwa="Straty godzinowe" />
            </Link>
            <Link to="/precizo/">
              <MenuEl key={nanoid()} obraz={fork} nazwa="Wezwij transport" />
            </Link>
            <Link to="/precizo/">
              <MenuEl key={nanoid()} obraz={hammer} nazwa="Zgłoś awarię" />
            </Link>
            <Link to="/precizo/">
              <MenuEl key={nanoid()} obraz={chart} nazwa="Statystyki" />
            </Link>
            <Link to="/precizo/">
              <MenuEl key={nanoid()} obraz={cart} nazwa="Zamówienia" />
            </Link>
            <Link to="/precizo/">
              <MenuEl key={nanoid()} obraz={profile} nazwa="Mój profil" />
            </Link>
            <Link to="/precizo/kj/">
              <MenuEl key={nanoid()} obraz={inspection} nazwa="KJ" />
            </Link>
          </div>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
};
