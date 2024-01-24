import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useCreateLesson = () => {
const navigate = useNavigate();

  const [lessonInfo, setLessonInfo] = useState(null);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const createLesson = async (buttons) => {
    try {
      const response = await fetch('http://localhost:3001/create-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, ...buttons }),
      });

      if (!response.ok) {
        throw new Error('Failed to create lesson');
      }

      const data = await response.json();
      setLessonInfo(data);
      navigate(`/created-session-preview`, { state: data });
    } catch (error) {
      setError(error.message);
    }
  };

  return { createLesson, lessonInfo, error };
};

export default useCreateLesson;
