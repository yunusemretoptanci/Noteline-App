import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function useEndLesson() {
    const navigate = useNavigate();

    const [lessonInfo, setLessonInfo] = useState(null);
    const [error, setError] = useState(null);
    const auth = localStorage.getItem("myCurrentLesson");

    const endLesson = async () => {
        let code = auth.code;
        let pin = auth.pin;
        try {
          setError(null);
          const response = await fetch("http://localhost:3001/finish-lesson", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, pin }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          // Başlatma başarılıysa gerekli işlemleri burada yapabilirsiniz
            navigate(`/lesson-summary/${data.lessonCode}`);
        } catch (error) {
          setError(error.message || "Bir hata oluştu");
        } finally {
        }
      };
  
    return { endLesson };
  };


export default useEndLesson