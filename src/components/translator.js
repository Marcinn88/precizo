async function translateText(text, targetLanguage) {
    const apiKey = "YOUR_API_KEY"; // Replace with your actual Gemini API key
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
  
  // Example usage:
  const textToTranslate = "안녕하세요! 서울에서 맛있는 길거리 음식을 찾고 계신가요?";
  const targetLanguage = "en"; // Translate to English
  
  translateText(textToTranslate, targetLanguage)
    .then(translatedText => {
      console.log(`Translated text: ${translatedText}`);
    });