import { useState } from 'react';

const useLesson = () => {
  const [error, setError] = useState(null);

  const startLesson = async (code, pin) => {
    try {
      setError(null);

      const response = await fetch('http://localhost:3001/start-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, pin }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Başlatma başarılıysa gerekli işlemleri burada yapabilirsiniz
      console.log(data);
      return data; // Başarı durumunu döndür

    } catch (error) {
      setError(error.message || 'Bir hata oluştu');
    } finally {
    }
  };

  return {
    startLesson,
    error
  };
};

export default useLesson;
