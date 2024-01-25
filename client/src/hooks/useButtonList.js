import React, { useEffect, useState } from 'react';

function useButtonList() {
  const [buttonList, setButtonList] = useState([]);

  useEffect(() => {
    // get the buttonList from localStorage
    const storedButtonList = JSON.parse(localStorage.getItem('buttonList')) || [];
    setButtonList(storedButtonList);
  }, []);

  const addNewButtonList = (newButton) => {
    // take a copy of the old buttonList
    const oldButtonList = [...buttonList];
    
    // add the new button to the old buttonList
    const updatedButtonList = [...oldButtonList, newButton];
    localStorage.setItem('buttonList', JSON.stringify(updatedButtonList));

    // set the new buttonList
    setButtonList(updatedButtonList);
  };

  return [buttonList, addNewButtonList];
}

export default useButtonList;
