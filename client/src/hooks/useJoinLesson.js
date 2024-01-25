import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function useJoinLesson() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const joinLesson = async (code) => {
    try {
      setError(null);
      const response = await fetch(`http://localhost:3001/join-lesson/${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      navigate(`/lesson/${data.lessonCode}`);
    } catch (error) {
      setError(error.message || "Error");
    } finally {
    }
  };

    return {
        joinLesson,
        error,
    };
}

export default useJoinLesson;
