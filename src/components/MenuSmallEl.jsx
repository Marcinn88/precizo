import styles from "./MenuSmallEl.module.css";

export const MenuSmallEl = ({ obraz, nazwa }) => {
  return (
    <>
      <div className={styles.MenuSmallEl_wrapper}>
        <img className={styles.MenuSmallEl_img} alt="zlecenia" src={obraz} />
        <p className={styles.MenuSmallEl_title}>{nazwa}</p>
      </div>
    </>
  );
};
