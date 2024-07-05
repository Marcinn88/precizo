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
        <p>Płytka tokarska VBMT160408-PF 1515</p>
        <div>
          <p>krawędź</p>
          <ul>
            <li>aktualna</li>
            <li>wszystkie</li>{" "}
          </ul>
          <ul>
            <li>1</li>
            <li>/</li>
            <li>6</li>
          </ul>
          <ul>
            <li>zmiana za</li>
            <li>żywotność</li>
          </ul>
          <ul>
            <li>50</li>
            <li>99</li>
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
