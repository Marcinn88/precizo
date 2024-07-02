import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Loader } from "../components/Loader";

export const Layout = ({ token }) => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      {/* <Footer token={token} /> */}
    </>
  );
};

export default Layout;
