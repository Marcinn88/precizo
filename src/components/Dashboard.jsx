import styles from "./Dashboard.module.css";
import { Card } from "./Card";
import { Nav } from "./Nav";
import data from "../JSON/cards.json";
export const Dashboard = ({ token }) => {
  return (
    <>
      <Nav />
      <div className={styles.Dashboard}>
        {data.cards.map(
          ({
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
              <Card
                local_kod={local_kod}
                gniazdo={gniazdo}
                nazwa_zadania={nazwa_zadania}
                nazwa_narzedzia={nazwa_narzedzia}
                edge_current={edge_current}
                edge_all={edge_all}
                counter={counter}
                life={life}
              />
            );
          }
        )}
      </div>
    </>
  );
};
