import { Order } from "./Order";
import styles from "./OrderList.module.css";
import data from "../JSON/orders.json";
import { Nav } from "./Nav";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
console.log(data.orders);
export const OrderList = ({ token }) => {
  return (
    <>
      <Nav />
      <div className={styles.OrderList}>
        {data.orders
          // .toReversed()
          .map(
            ({
              numer,
              nazwa,
              indeks,
              wariant,
              podwersja,
              status,
              obrabiarka,
              nazwa_op,
              numer_op,
              ilosc,
              bufor,
              zgl_do_zdps,
            }) => {
              return (
                <Link
                  to="/precizo/dashboard/"
                  onClick={() => {
                    console.log("Test kliknięcia");
                    localStorage.setItem(
                      "order",
                      JSON.stringify({
                        numer: numer,
                        nazwa: nazwa,
                        indeks: indeks,
                        wariant: wariant,
                        podwersja: podwersja,
                        status: status,
                        obrabiarka: obrabiarka,
                        nazwa_op: nazwa_op,
                        numer_op: numer_op,
                        ilosc: ilosc,
                        bufor: bufor,
                        zgl_do_zdps: zgl_do_zdps,
                      })
                    );
                  }}
                >
                  <Order
                    key={nanoid()}
                    numer={numer}
                    nazwa={nazwa}
                    indeks={indeks}
                    wariant={wariant}
                    podwersja={podwersja}
                    status={status}
                    obrabiarka={obrabiarka}
                    nazwa_op={nazwa_op}
                    numer_op={numer_op}
                    ilosc={ilosc}
                    bufor={bufor}
                    zgl_do_zdps={zgl_do_zdps}
                  />
                </Link>
              );
            }
          )}
      </div>
    </>
  );
};
