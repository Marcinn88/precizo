import styles from "./Translator.module.css";
import { Nav } from "./Nav";
import { LoginPage } from "./LoginPage";
import { useState } from "react";

export const Translator = ({ token }) => {

  const [textBox, setTextBox] = useState("")
  const [results, setResults] = useState("")

  const targetLanguage = "en";

  async function translateText(text, targetLanguage) {
    const apiKey = import.meta.env.TRANSLATE_API_KEY
    const apiUrl = "https://api.gemini.com/v1/translate";
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text: text,
          targetLanguage: targetLanguage
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error('Error translating text:', error);
      return null;
    }
  }

  const submitTranslate = (e) => {
    e.preventDefault();
    console.log("Translation sent...");
    console.log(textBox);
    translateText(textBox, targetLanguage)
      .then(translatedText => {
        setResults(translatedText)
        console.log(`Translated text: ${translatedText}`);
    });
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
              <textarea className={styles.tran_text} onChange={(e)=>{setTextBox(e.target.value)}} />
              <input
                className={styles.tran_btn}
                value="Tłumacz"
                type="submit"
              />
            </form>
            <p className={styles.tran_title}>Wyniki:</p>
            <div className={styles.tran_results}>
            {results}
            </div>
          </div>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
};
