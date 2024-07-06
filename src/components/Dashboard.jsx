import styles from "./Dashboard.module.css";
import { Card } from "./Card";
import { Nav } from "./Nav";
export const Dashboard = ({ token }) => {
  return (
    <>
      <Nav />
      <div className={styles.Dashboard}>
        <Card />
      </div>
    </>
  );
};
