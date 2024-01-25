import React, { useEffect, useState } from "react";
import ReactionButtons from "../../components/ReactionButtons";
import { TextArea, Text, Card, ScrollArea, Button } from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import useLesson from "../../hooks/useLesson";
import io from "socket.io-client";
import useDisconnectLesson from "../../hooks/useDisconnectLesson";
import useUserId from "../../hooks/useUserId";
import useButtonClick from "../../hooks/useButtonClick";
import { PersonIcon } from "@radix-ui/react-icons";
import useEndLesson from "../../hooks/useEndLesson";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Lesson() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userId = useUserId();
  let { lessonCode } = useParams();
  const { disconnectLesson } = useDisconnectLesson();
  const { getLessonInfo, lessonInfo } = useLesson();
  const [userIsHost, setUserIsHost] = useState(false);
  const { getClicks, clicks } = useButtonClick();
  const { endLesson } = useEndLesson();
  const [lessonButtons, setLessonButtons] = useState([]);

  const checkUserIsHost = () => {
    if (lessonInfo?.userId === userId) setUserIsHost(true);
    else setUserIsHost(false);
  };

  useEffect(() => {
    checkUserIsHost();
    let sessionButtons = {
      ahaButton: false,
      lostButton: false,
      referanceButton: false,
      commentButton: false,
      questionButton: false,
    };
    if (lessonInfo?.ahaButton) sessionButtons.ahaButton = true;
    if (lessonInfo?.lostButton) sessionButtons.lostButton = true;
    if (lessonInfo?.referanceButton) sessionButtons.referanceButton = true;
    if (lessonInfo?.commentButton) sessionButtons.commentButton = true;
    if (lessonInfo?.questionButton) sessionButtons.questionButton = true;
    setLessonButtons(sessionButtons);
  }, [lessonInfo]);
  useEffect(() => {
    let socket = io("http://localhost:3001");
    socket.on("lesson-joined", () => {
      console.log("lesson-joined");
      getLessonInfo(lessonCode);
    });

    socket.on("lesson-finished", () => {
      console.log("lesson-finished");
      navigate(`/lesson-summary/${lessonCode}`);
    });

    socket.on("lesson-disconnected", () => {
      console.log("lesson-disconnected");
      getLessonInfo(lessonCode);
    });

    socket.on("button-clicked", () => {
      console.log("button-clicked");
      getClicks(lessonCode);
    });

    getLessonInfo(lessonCode);
    getClicks(lessonCode);

    const handleBeforeUnload = () => {
      if (localStorage.getItem("lessonCode") !== lessonCode) {
        localStorage.removeItem("lessonCode");
      }
      if (localStorage.getItem("lessonCode") !== null) return;
      localStorage.setItem("lessonCode", lessonCode);

      disconnectLesson(lessonCode);
      
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleBeforeUnload);
    };
  }, []);

  const defaultButtonNames = {
    Aha: "Aha!",
    Lost: "I'm Lost",
  };

  const mutateData = (data) => {
    data.map((item) => {
      if (item.buttonName === "Aha") {
        item.buttonName = defaultButtonNames["Aha"];
      }
      if (item.buttonName === "Lost") {
        item.buttonName = defaultButtonNames["Lost"];
      }
    });
  };

  mutateData(clicks);

  return (
    <div className="flex flex-col md:pt-0 pt-20 pb-4 md:h-full h-auto items-center justify-center ">
      {userIsHost && (
        <div className="flex items-center justify-center w-full md:px-52 px-4">
          <div className="flex">
            <PersonIcon className="w-6 h-6 mr-2 text-green-300" />
            <p className="text-lg font-semibold text-gray-900 dark:text-black">
              {lessonInfo.onlineParticipants}
            </p>
          </div>
          <div className="flex ml-12">
            <PersonIcon className="w-6 h-6 mr-2 text-red-300" />
            <p className="text-lg font-semibold text-gray-900 dark:text-black">
              {lessonInfo.disconnectedParticipants}
            </p>
          </div>
        </div>
      )}
      <div className="flex md:flex-row flex-col items-center justify-center md:gap-36 gap-3 w-full md:px-52 px-3">
        <div className=" w-full">
          <Card asChild className="w-full mb-4">
            <Text as="div" size="2" weight="bold">
              {lessonInfo?.name}
            </Text>
          </Card>
          <Card className="w-full min-h-44">
            <Text as="div" size="2" weight="bold">
            {t("lesson.sessionDescription")}
            </Text>
            <ScrollArea
              type="always"
              scrollbars="vertical"
              style={{ height: 180 }}
            >
              <Text as="div" color="gray" size="2">
                {lessonInfo?.description}
              </Text>
            </ScrollArea>
          </Card>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex w-full flex-col items-center justify-center mt-8 ">
            {userIsHost ? (
              <ScrollArea
                type="always"
                scrollbars="vertical"
                style={{ height: 400 }}
              >
                <div className="flex flex-col  justify-center w-full pl-24">
                  <ol className="relative border-s border-gray-200 dark:border-gray-700 ">
                    {clicks
                      .slice()
                      .reverse()
                      .map((item) => (
                        <li key={item.id} className="mb-10 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            {item.clickTime.split(" ")[1].split(":")[0]}:
                            {item.clickTime.split(" ")[1].split(":")[1]}
                          </time>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                            {item.buttonName}
                          </h3>
                          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                            {item.additionalText}
                          </p>
                        </li>
                      ))}
                  </ol>
                </div>
              </ScrollArea>
            ) : (
              <ReactionButtons lesson={lessonInfo} buttonList={lessonButtons} />
            )}
          </div>
        </div>
      </div>
      {userIsHost && (
        <Button
          className="mt-6 cursor-pointer"
          color="red"
          variant="soft"
          size="4"
          onClick={() => endLesson()}
        >
         {t('lesson.endSession')}
        </Button>
      )}
    </div>
  );
}

export default Lesson;
