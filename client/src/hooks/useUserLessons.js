import React, { useEffect, useState } from 'react'
import useUserId from './useUserId';

// Custom hook to get all lessons that the user has not started yet
function useUserLessons() {
    const [userLessons, setUserLessons] = useState([]); 
    const userId = useUserId();
    useEffect(() => {
        if(userId)
        getUserLesson();
    }
    , [userId]);

    const getUserLesson = async () => {
        try {
            const response = await fetch(`http://localhost:3001/get-unstarted-lessons/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setUserLessons(data);
        } catch (error) {
            console.error(error);
        } finally {
        }
    }
    return {userLessons};
}

export default useUserLessons