import { Dashboard } from "./Dashboard";
import styles from "./Hero.module.css";
import { OrderList } from "./OrderList";

export const Hero = ({ token }) => {
  return (
    <>
      {/* <Dashboard /> */}
      <OrderList />
    </>
  );
};
