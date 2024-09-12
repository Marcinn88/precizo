import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Main } from "./components/Main";
import { OrderList } from "./components/OrderList";
import { Layout } from "./layouts/layout";
import { Lab } from "./components/Lab";
import { Circles } from "./components/Circles";
import { Kj } from "./components/Kj";
import { PSW } from "./components/PSW";
import { PSWmanual } from "./components/PSWmanual";
import { MT } from "./components/MT";
import { Translator } from "./components/Translator";
import { Scout } from "./components/Scout";
import { MachineOnline } from "./components/MachineOnline";

const App = () => {
  // console.log("server uruchomiony");
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
        <Route path="/precizo/kj" element={<Kj token={tokenChecker()} />} />
        <Route path="/precizo/translator" element={<Translator token={tokenChecker()} />} />
        <Route
          path="/precizo/kj/lab"
          element={<Lab token={tokenChecker()} />}
        />
        <Route
          path="/precizo/kj/circles"
          element={<Circles token={tokenChecker()} />}
        />
        <Route path="/precizo/kj/mt" element={<MT token={tokenChecker()} />} />
        <Route
          path="/precizo/kj/psw-auto"
          element={<PSW token={tokenChecker()} />}
        />
        <Route
          path="/precizo/kj/psw-manual"
          element={<PSWmanual token={tokenChecker()} />}
        />
        <Route
          path="/precizo/scout/machines"
          element={<MachineOnline token={tokenChecker()} />}
        />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
        <Route path="/precizo/scout" element={<Scout token={tokenChecker()} />} />
    </Routes>
  );
};
export default App;
