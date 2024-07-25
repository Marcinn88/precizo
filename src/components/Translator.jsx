import styles from "./Translator.module.css";
import { Nav } from "./Nav";
import { LoginPage } from "./LoginPage";


export const Translator = ({ token }) => {

const submitTranslate = (e) => {
    e.preventdefault()
    console.log("Translation sent...")
}

    return (
    <>
      {token === "admin" ? (
        <>
          <Nav />
          <div>
            <form onSubmit={()=>{submitTranslate()}}>
                <input type="text" />
                <input type="submit" />
            </form>
          </div>
        </>
      ) : (
        <LoginPage />
      )}
    </>)
};
