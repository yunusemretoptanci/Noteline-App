import { Button } from "@radix-ui/themes";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import useLesson from "../../hooks/useLesson";
import { useTranslation } from 'react-i18next';
function CreatedSessionPreview() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { startLesson, error } = useLesson();

  const onStartLesson = () => {
    startLesson(state.code, state.pin);
  };
  
  return (
    <>
      <div className="flex flex-col px-6 md:px-0 items-center justify-center h-full ">
        <div className="border-2 border-gray-200 rounded-lg p-8">
          <p className="text-2xl font-medium">
          {t('sessionPreview.sessionName')}{" "}
            <span className="text-2xl font-light"> {state.name}</span>
          </p>
          <p className="text-2xl font-medium mt-8">
          {t('sessionPreview.sessionDescription')}{" "}
            <span className="text-2xl font-light"> {state.description}</span>
          </p>

          <h2 className="text-2xl font-normal mt-8 my-12 text-green-500">
          {t('sessionPreview.sessionCreated')}
          </h2>

          <div className="flex  justify-between mt-8">
            <p className="text-2xl font-normal">{t('sessionPreview.joinWithCode')}</p>
            <p className="text-2xl font-light text-green-600"> {state.code}</p>
          </div>
          <div className="flex justify-between mt-8">
            <p className="text-2xl font-normal"> {t('sessionPreview.pin')} </p>
            <p className="text-2xl font-light text-red-600 "> {state.pin}</p>
          </div>
        </div>

        <div className="flex md:gap-32 gap-3">
          <Button
            className="mt-3 cursor-pointer "
            color="orange"
            variant="soft"
            size={"4"}
            onClick={onStartLesson}
          >
            {t('sessionPreview.hostNow')}
          </Button>

          <Link to="/">
            <Button
              className="mt-3 cursor-pointer "
              color="green"
              variant="soft"
              size={"4"}
            >
              {t('sessionPreview.saveLater')}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CreatedSessionPreview;
