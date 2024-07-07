import styles from "./Card.module.css";
import ico from "../images/search.svg";

export const Card = ({
  token,
  local_kod,
  gniazdo,
  nazwa_zadania,
  nazwa_narzedzia,
  edge_current,
  edge_all,
  counter,
  life,
}) => {
  return (
    <>
      <div className={styles.Card}>
        <p className={styles.cardCode}>{local_kod}</p>
        <div className={styles.cardPhotoButton}>
          <img className={styles.cardIco} alt="Lupa" src={ico} />
        </div>
        <ul className={styles.cardHeader}>
          <li>
            <p className={styles.cardHeaderNumber}>{gniazdo}</p>
          </li>
          <li>
            <p className={styles.cardHeaderTitle}>{nazwa_zadania}</p>
          </li>
        </ul>
        <p className={styles.cardToolName}>{nazwa_narzedzia} </p>
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
              <p className={styles.cardParameter}>{edge_current}</p>
            </li>
            <li>
              <p className={styles.cardParameterSlash}>/</p>
            </li>
            <li>
              <p className={styles.cardParameter}>{edge_all}</p>
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
              <p className={styles.cardParameter}>{counter}</p>
            </li>
            <li>
              <p className={styles.cardParameterSlash}></p>
            </li>
            <li>
              <p className={styles.cardParameter}>{life}</p>
            </li>
          </ul>
        </div>
        <ul className={styles.cardButtonList}>
          <li>
            <button className={styles.cardButton}>Zmień krawędź</button>
          </li>
          <li>
            <button className={styles.cardButton}>Wymień narzędzie</button>
          </li>
        </ul>
      </div>
    </>
  );
};
