import { Dashboard } from "./Dashboard";
import styles from "./Hero.module.css";
import { MenuEl } from "./MenuEl";
import { Nav } from "./Nav";
import { OrderList } from "./OrderList";

export const Hero = ({ token }) => {
  return (
    <>
      <Nav />
      <div className={styles.Hero_wrapper}>
        <MenuEl />
        {/* <OrderList /> */}
        {/* <Dashboard /> */}
      </div>
    </>
  );
};
