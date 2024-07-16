import { Nav } from "./Nav";
import styles from "./PSW.module.css";

export const PSW = ({ token }) => {
  return (
    <>
      <Nav />
      <div className={styles.PSW_wrapper}>
        <h1>PSW</h1>
      </div>
    </>
  );
};
