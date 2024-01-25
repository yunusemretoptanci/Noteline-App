import React, { useEffect, useState } from "react";
import { Button} from "@radix-ui/themes";
import useJoinLesson from "../../hooks/useJoinLesson";
import ErrorModal from "../../components/ErrorModal";
import { useTranslation } from 'react-i18next';

function Join() {
  const { t } = useTranslation();
  const { joinLesson, error } = useJoinLesson();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const startLessonWithCode = (event) => {
    event.preventDefault();
    const code = event.target[0].value;
    joinLesson(code);
  };

  useEffect(() => {
    if(error){
      setIsErrorModalOpen(true);
    }
  }, [error])

  return (
    <div className="flex h-full gap-32 items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-stone-700 mb-2">
        {t('join.joinSession')}
        </p>
        <form className="flex flex-col" onSubmit={startLessonWithCode}>
          <input
            type="text"
            placeholder={t('join.sessionCode')}
            className="border-2 border-gray-300 rounded-md p-2"
          />
          <Button
          className="mt-3 cursor-pointer w-full"
          color="green"
          variant="soft"
          type="submit"
        >
          {t('join.join')}
        </Button>
        </form>
      </div>
      <ErrorModal isOpen={isErrorModalOpen} setIsOpen={setIsErrorModalOpen} errText={t('join.errText')} />
    </div>
  );
}

export default Join;
