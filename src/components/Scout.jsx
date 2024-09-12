import { Nav } from "./Nav";
import { Link } from "react-router-dom";
import { MenuEl } from "./MenuEl";
import styles from "./Scout.module.css";
import { nanoid } from "nanoid";

import cnc_machine from "../images/machine-cnc.svg"

export const Scout = ({ token }) => {
  return (
    <>
      <Nav />
      <div className={styles.Scout_wrapper}>
        <Link to="/precizo/scout/machines">
          <MenuEl key={nanoid()} obraz={cnc_machine} nazwa="Maszyny Online" />
        </Link>
      </div>
    </>
  );
};
