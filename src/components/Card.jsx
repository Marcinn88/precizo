import styles from "./Card.module.css";

export const Card = ({ token }) => {
  return (
    <>
      <div className={styles.Card}>
        <p className={styles.cardCode}>13Y+</p>
        <ul className={styles.cardHeader}>
          <li>
            <p className={styles.cardHeaderNumber}>05</p>
          </li>
          <li>
            <p className={styles.cardHeaderTitle}>1. Planowanie</p>
          </li>
        </ul>
        <p className={styles.cardToolName}>
          Płytka tokarska VBMT160408-PF 1515
        </p>
        <div className={styles.cardHero}>
          <p className={styles.cardDescription}>krawędź</p>
          <ul className={styles.cardDescriptionList}>
            <li>
              <p className={styles.cardDescription}>aktualna</p>
            </li>
            <li>
              <p className={styles.cardDescription}>wszystkie</p>
            </li>
          </ul>
          <ul className={styles.cardParametersList}>
            <li>
              <p>1</p>
            </li>
            <li>
              <p>/</p>
            </li>
            <li>
              <p>6</p>
            </li>
          </ul>
          <ul className={styles.cardDescriptionList}>
            <li>
              <p className={styles.cardDescription}>zmiana za</p>
            </li>
            <li>
              <p className={styles.cardDescription}>żywotność</p>
            </li>
          </ul>
          <ul className={styles.cardParametersList}>
            <li>
              <p>50</p>
            </li>
            <li>
              <p>99</p>
            </li>
          </ul>
        </div>
        <ul>
          <li>
            <button>Zmień krawędź</button>
          </li>
          <li>
            <button>Wymień narzędzie</button>
          </li>
        </ul>
      </div>
    </>
  );
};
