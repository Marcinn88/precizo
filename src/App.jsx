import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Main } from "./components/Main";
import { OrderList } from "./components/OrderList";
import { Layout } from "./layouts/layout";

const App = () => {
  console.log("server uruchomiony");
  const tokenChecker = () => {
    try {
      const token = localStorage.getItem("token");
      const parsedToken = JSON.parse(token).token;
      return parsedToken;
    } catch (error) {
      localStorage.setItem("token", JSON.stringify({ token: "" }));
      const token = localStorage.getItem("token");
      const parsedToken = JSON.parse(token).token;
      return parsedToken;
    }
  };
  return (
    <Routes>
      <Route path="/precizo/" element={<Layout token={tokenChecker()} />}>
        <Route path="/precizo/" element={<Main token={tokenChecker()} />} />
        <Route
          path="/precizo/orders"
          element={<OrderList token={tokenChecker()} />}
        />
        <Route
          path="/precizo/dashboard"
          element={<Dashboard token={tokenChecker()} />}
        />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
};
export default App;
