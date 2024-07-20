import { Nav } from "./Nav";
import { Link } from "react-router-dom";
import { MenuEl } from "./MenuEl";
import styles from "./Kj.module.css";
import { nanoid } from "nanoid";

import document from "../images/document.svg";
import results from "../images/results.svg";
import circles from "../images/circles.svg";

export const Kj = ({ token }) => {
  return (
    <>
      <Nav />
      <div className={styles.Kj_wrapper}>
        <Link to="/precizo/kj/psw-manual">
          <MenuEl key={nanoid()} obraz={document} nazwa="PSW manual" />
        </Link>
        <Link to="/precizo/kj/psw-auto">
          <MenuEl key={nanoid()} obraz={document} nazwa="PSW auto" />
        </Link>
        <Link to="/precizo/kj/lab/">
          <MenuEl key={nanoid()} obraz={results} nazwa="Laboratorium" />
        </Link>
        <Link to="/precizo/kj/circles/">
          <MenuEl key={nanoid()} obraz={circles} nazwa="Kółkowanie" />
        </Link>

      </div>
    </>
  );
};
