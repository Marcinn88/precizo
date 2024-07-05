import styles from "./Dashboard.module.css";
import { Card } from "./Card";
export const Dashboard = ({ token }) => {
  return (
    <>
      <div className={styles.Dashboard}>
        <Card />
      </div>
    </>
  );
};
