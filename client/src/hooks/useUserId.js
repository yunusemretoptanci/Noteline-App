import { useState, useEffect } from 'react';

const useUserId = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = generateUserId();
      setUserId(newUserId);

      localStorage.setItem('userId', newUserId);
    }
  }, []);

  const generateUserId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  return userId;
};

export default useUserId;
