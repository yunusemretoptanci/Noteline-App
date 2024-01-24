import React, { useEffect, useState } from 'react';

function useButtonList() {
  const [buttonList, setButtonList] = useState([]);

  useEffect(() => {
    // localStorage'dan veriyi çek
    const storedButtonList = JSON.parse(localStorage.getItem('buttonList')) || [];
    setButtonList(storedButtonList);
  }, []);

  const addNewButtonList = (newButton) => {
    // Mevcut buttonList'in kopyasını al
    const oldButtonList = [...buttonList];
    
    // Yeni butonu ekleyerek güncellenmiş listeyi localStorage'a kaydet
    const updatedButtonList = [...oldButtonList, newButton];
    localStorage.setItem('buttonList', JSON.stringify(updatedButtonList));

    // State'i güncelle
    setButtonList(updatedButtonList);
  };

  return [buttonList, addNewButtonList];
}

export default useButtonList;
