import React, { useState } from "react";
import { Button, Slider } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import useButtonClick from "../hooks/useButtonClick";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

function ReactionButtons({ buttonList, isOnlyPreview, lesson }) {
  const { t } = useTranslation();
  const { handleClick } = useButtonClick();
  const notify = () => toast.success("Reaction Saved!");
  const [buttonName, setButtonName] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [isAdditionalTextExist, setIsAdditionalTextExist] = useState(false);
  const [clickButtonModalOpen, setClickButtonModalOpen] = useState(false);
  const [time, setTime] = useState(55);
  const [maxTime, setMaxTime] = useState(60);
  const onTimeChange = (e) => {
    const value = e.target.value;

    /* if value is bigger than 0.6 round up */
    if (value % 1 > 0.6) {
      setTime(Math.ceil(value));
    } else {
      setTime(value);
    }
  };

  const oneMinAgo = () => {
    if (time > 1) {
      const newTime = time - 1;
      setTime(newTime.toFixed(2));
    }
  };
  const fiveMinAgo = () => {
    if (time > 5) {
      const newTime = time - 5;
      setTime(newTime.toFixed(2));
    }
  };

  const timeDifference = () => {
    const now = new Date();
    now.setHours(now.getHours() - 3);
    const targetDate = new Date(lesson.startedAt);

    const timeDifference = now - targetDate;
    const minutesDifference = new Date(timeDifference).getMinutes();
    const secondsDifference = new Date(timeDifference).getSeconds();
    console.log(now);
    console.log(targetDate);
    console.log(`${minutesDifference}:${secondsDifference}`);
    
    // Display minutes in console

    // Set state or perform other actions with the minutes
    setTime(`${minutesDifference}.${secondsDifference}`);
    setMaxTime(`${minutesDifference}.${secondsDifference}`);
};


  const onAhaButtonClick = () => {
    setButtonName("Aha");
    setClickButtonModalOpen(true);
    setIsAdditionalTextExist(false);
    timeDifference();
  };

  const onLostButtonClick = () => {
    setButtonName("Lost");
    setClickButtonModalOpen(true);
    setIsAdditionalTextExist(false);
    timeDifference();
  };

  const onReferanceButtonClick = () => {
    setButtonName("Referance");
    setClickButtonModalOpen(true);
    setIsAdditionalTextExist(true);
    timeDifference();
  };

  const onCommentButtonClick = () => {
    setButtonName("Comment");
    setClickButtonModalOpen(true);
    setIsAdditionalTextExist(true);

    timeDifference();
  };

  const onQuestionButtonClick = () => {
    setButtonName("Question");
    setClickButtonModalOpen(true);
    setIsAdditionalTextExist(true);
    timeDifference();
  };

  const saveClick = () => {
    const updatedTime = new Date(lesson.startedAt);
    /* updated time plus time munits */
    updatedTime.setMinutes(updatedTime.getMinutes() + Number(time));
    updatedTime.setHours(updatedTime.getHours() + 3);
    const formattedTime = `${updatedTime.getFullYear()}-${String(
      updatedTime.getMonth() + 1
    ).padStart(2, "0")}-${String(updatedTime.getDate()).padStart(
      2,
      "0"
    )} ${String(updatedTime.getHours()).padStart(2, "0")}:${String(
      updatedTime.getMinutes()
    ).padStart(2, "0")}:${String(updatedTime.getSeconds()).padStart(2, "0")}`;
    handleClick(lesson.code, buttonName, formattedTime, additionalText);
    setAdditionalText("");
    setClickButtonModalOpen(false);
    notify();
  };
  return (
    <>
      {buttonList.ahaButton && (
        <Button
          className="mt-3 cursor-pointer w-full"
          color="orange"
          variant="soft"
          onClick={!isOnlyPreview && onAhaButtonClick}
        >
        {t("buttonNames.aha")}
        </Button>
      )}
      {buttonList.lostButton && (
        <Button
          className="mt-3 cursor-pointer w-full"
          color="orange"
          variant="soft"
          onClick={!isOnlyPreview && onLostButtonClick}
        >
          {t("buttonNames.lost")}
        </Button>
      )}
      {buttonList.referanceButton && (
        <Button
          className="mt-3 cursor-pointer w-full"
          color="orange"
          variant="soft"
          onClick={!isOnlyPreview && onReferanceButtonClick}
        >
          {t("buttonNames.reference")}
        </Button>
      )}
      {buttonList.commentButton && (
        <Button
          className="mt-3 cursor-pointer w-full"
          color="orange"
          variant="soft"
          onClick={!isOnlyPreview && onCommentButtonClick}
        >
          {t("buttonNames.comment")}
        </Button>
      )}
      {buttonList.questionButton && (
        <Button
          className="mt-3 cursor-pointer w-full"
          color="orange"
          variant="soft"
          onClick={!isOnlyPreview && onQuestionButtonClick}
        >
         {t("buttonNames.question")}
        </Button>
      )}

      <Dialog.Root
        open={clickButtonModalOpen}
        onOpenChange={setClickButtonModalOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl">{buttonName}</Dialog.Title>
              <Dialog.Close className="text-gray-400 hover:text-gray-500">
                <Cross1Icon />
              </Dialog.Close>
            </div>

            <div className="mt-6">
              {isAdditionalTextExist && (
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 mb-4 py-2 text-sm"
                  placeholder="Additional Text"
                  onChange={(e) => setAdditionalText(e.target.value)}
                  value={additionalText}
                />
              )}
              <div className="h-24 flex flex-col">
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  {time}
                </p>
                <input
                  type="range"
                  className="w-full"
                  min="0"
                  max={maxTime}
                  step="0.05"
                  onChange={onTimeChange}
                  value={time}
                />
                <div className="flex justify-around">
                  <Button
                    className="mt-3 cursor-pointer px-3 py-1"
                    color="orange"
                    variant="soft"
                    onClick={oneMinAgo}
                    size="4"
                  >
                    -1 min
                  </Button>

                  <Button
                    className="mt-3 cursor-pointer px-3 py-1"
                    color="orange"
                    variant="soft"
                    onClick={fiveMinAgo}
                    size="4"
                  >
                    -5 min
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 space-x-6 flex">
              <Dialog.Close className="rounded px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600 w-full">
                Cancel
              </Dialog.Close>
              <button
                className="rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 w-full"
                onClick={saveClick}
              >
                Save
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <ToastContainer />
    </>
  );
}

export default ReactionButtons;
