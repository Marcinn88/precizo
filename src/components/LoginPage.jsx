import styles from "./LoginPage.module.css";
import logoImg from "../images/Precizo_duzeLogo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export const LoginPage = ({ token }) => {
  const [loginData, setLoginData] = useState({});
  const ref = () => {
    window.location.reload(false);
  };
  const login = (e) => {
    e.preventDefault();
    if (
      loginData.login === import.meta.env.VITE_ADMIN_LOGIN &&
      loginData.password === import.meta.env.VITE_ADMIN_PASS
    ) {
      console.log("loginData", loginData);
      localStorage.setItem("token", JSON.stringify({ token: "admin" }));
      ref();
    } else {
      alert("Zle haslo");
    }
  };
  const submit = (e) => {
    console.log("zalogowano");
    e.preventDefault();
  };

  return (
    <>
      <div className={styles.loginPage_wrapper}>
        <img className={styles.loginPage_logoImg} src={logoImg} alt="logo" />
        <form
          className={styles.loginPage_Form}
          onSubmit={() => {
            login;
            url("/precizo/");
          }}
        >
          <input
            className={styles.loginPage_FormField}
            type="text"
            placeholder="login"
            onChange={(e) => {
              setLoginData({ ...loginData, login: e.target.value });
            }}
          />
          <input
            className={styles.loginPage_FormField}
            type="password"
            placeholder="hasło"
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
            }}
          />
          <button className={styles.FormBtn} onClick={login}>
            <Link to="/precizo/">Zaloguj się!</Link>
          </button>
        </form>
      </div>
    </>
  );
};
