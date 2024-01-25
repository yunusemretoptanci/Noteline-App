import React from 'react'

function useDisconnectLesson() {
  
    const disconnectLesson = async (lessonCode) => {
      try {
        const response = await fetch(`http://localhost:3001/disconnect-lesson/${lessonCode}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
      } catch (error) {
        console.error(error);
      } finally {
      }
    };
  
      return {
          disconnectLesson,
      };
}

export default useDisconnectLesson