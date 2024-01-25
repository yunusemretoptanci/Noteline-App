import { useState } from "react";
import { useNavigate } from "react-router-dom";
const useLesson = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [lessonInfo, setLessonInfo] = useState(null);

  const startLesson = async (code, pin) => {
    try {
      setError(null);
      const response = await fetch("http://localhost:3001/start-lesson", {
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
      localStorage.setItem("myCurrentLesson", JSON.stringify({ code, pin }));
      // Başlatma başarılıysa gerekli işlemleri burada yapabilirsiniz
        navigate(`/lesson/${data.lessonCode}`);
    } catch (error) {
      setError(error.message || "Bir hata oluştu");
    } finally {
    }
  };

 

  const getLessonInfo = async (lessonCode) => {
    try {
      const response = await fetch(`http://localhost:3001/get-lesson/${lessonCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLessonInfo(data);

    } catch (error) {
     console.log(error)
    } finally {
    }
  };
  return {
    startLesson,
    error,
    getLessonInfo,
    lessonInfo,
  };
};

export default useLesson;
