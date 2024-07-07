import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { LoginPage } from "./LoginPage";
export const Main = ({ token }) => {
  return (
    <>
      {token === "admin" ? <Hero token={token} /> : <LoginPage token={token} />}
    </>
  );
};
