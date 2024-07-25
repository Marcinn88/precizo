import styles from "./Translator.module.css";
import { Nav } from "./Nav";
import { LoginPage } from "./LoginPage";

export const Translator = ({ token }) => {
  const submitTranslate = (e) => {
    e.preventDefault();
    console.log("Translation sent...");
  };

  return (
    <>
      {token === "admin" ? (
        <>
          <Nav />
          <div className={styles.Translator_wrapper}>
            <p className={styles.tran_title}>Wpisz dane do tłumaczenia:</p>
            <form
              className={styles.Translator}
              onSubmit={(e) => {
                submitTranslate(e);
              }}
            >
              <textarea className={styles.tran_text} />
              <input
                className={styles.tran_btn}
                value="Tłumacz"
                type="submit"
              />
            </form>
            <p className={styles.tran_title}>Wyniki:</p>
            <div className={styles.tran_results}></div>
          </div>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
};
