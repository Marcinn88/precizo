import styles from "./MenuEl.module.css";

export const MenuEl = ({ obraz, nazwa }) => {
  return (
    <>
      <div className={styles.MenuEl_wrapper}>
        <img className={styles.MenuEl_img} alt="zlecenia" src={obraz} />
        <p className={styles.MenuEl_title}>{nazwa}</p>
      </div>
    </>
  );
};
