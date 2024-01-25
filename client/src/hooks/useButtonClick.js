import { useEffect, useState } from 'react';

const useButtonClick = () => {
  const [clicks, setClicks] = useState([]);
  
    const handleClick = async (lessonCode, buttonName, clickTime, additionalText) => {
      try {
        const response = await fetch(`http://localhost:3001/click-button/${lessonCode}/${buttonName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ clickTime, additionalText }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const getClicks = async (lessonCode) => {
        try {
            const response = await fetch(`http://localhost:3001/get-clicks/${lessonCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setClicks(data);
        } catch (error) {
            console.error(error);
        } finally {
        }
    }


  return {handleClick, getClicks, clicks};
};

export default useButtonClick;
