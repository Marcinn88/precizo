import styles from "./Dashboard.module.css";
import { Card } from "./Card";
import { Nav } from "./Nav";
import data from "../JSON/cards.json";
import { Order } from "./Order";
import { LoginPage } from "./LoginPage";
import { nanoid } from "nanoid";

export const Dashboard = ({ token }) => {
  const order_data = localStorage.getItem("order");
  const parsedOrder = JSON.parse(order_data);

  return (
    <>
      {token === "admin" ? (
        <>
          <Nav />
          <Order
            id={nanoid}
            numer={parsedOrder.numer}
            nazwa={parsedOrder.nazwa}
            indeks={parsedOrder.indeks}
            wariant={parsedOrder.wariant}
            podwersja={parsedOrder.podwersja}
            status={parsedOrder.status}
            obrabiarka={parsedOrder.obrabiarka}
            nazwa_op={parsedOrder.nazwa_op}
            numer_op={parsedOrder.numer_op}
            ilosc={parsedOrder.ilosc}
            bufor={parsedOrder.bufor}
            zgl_do_zdps={parsedOrder.zgl_do_zdps}
          />

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
      ) : (
        <LoginPage />
      )}
    </>
  );
};
