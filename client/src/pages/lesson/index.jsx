import React, { useEffect, useState } from "react";
import ReactionButtons from "../../components/ReactionButtons";
import { TextArea, Text, Card,ScrollArea } from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import useLesson from "../../hooks/useLesson";
import io from 'socket.io-client';
import useDisconnectLesson from "../../hooks/useDisconnectLesson";
import useUserId from "../../hooks/useUserId";
import useButtonClick from "../../hooks/useButtonClick";
import { PersonIcon } from "@radix-ui/react-icons";
function Lesson() {
  const userId = useUserId();
  let {lessonCode} = useParams();
  const {disconnectLesson} = useDisconnectLesson();
  const {getLessonInfo,lessonInfo} = useLesson();
  const[userIsHost , setUserIsHost] = useState(false);
  const {getClicks, clicks} = useButtonClick()

  console.log(clicks);
  const checkUserIsHost = () => {
    if (lessonInfo?.userId === userId) setUserIsHost(true);
    else setUserIsHost(false);
  }
  useEffect(() => {
    checkUserIsHost();
  }, [lessonInfo])

  useEffect(() => {
    
  let socket = io('http://localhost:3001');
  socket.on('lesson-joined', () => {
    console.log('lesson-joined');
    getLessonInfo(lessonCode);
  });

  socket.on('lesson-disconnected', () => {
    console.log('lesson-disconnected');
    getLessonInfo(lessonCode);
  });


  socket.on('button-clicked', () => {
    console.log('button-clicked');
    getClicks(lessonCode);
  });

  getLessonInfo(lessonCode);
  getClicks(lessonCode);

  const handleBeforeUnload = () => {
    
    if(localStorage.getItem('lessonCode') !== lessonInfo.code){
      localStorage.removeItem('lessonCode');
    }
    if (localStorage.getItem('lessonCode') !== null) return;
    localStorage.setItem('lessonCode', lessonCode);
   
    disconnectLesson(lessonCode);
  }

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
  }, [])

  const defaultButtonNames = {
    "Aha":"Aha!",
    "Lost":"I'm Lost",
  };
  
  const mutateData = (data) => {
    data.map((item) => {
      if(item.buttonName === "Aha"){
        item.buttonName = defaultButtonNames["Aha"];
      }
      if(item.buttonName === "Lost"){
        item.buttonName = defaultButtonNames["Lost"];
      }
    })
  }

  mutateData(clicks);


  return (
    <div className="flex flex-col h-full items-center justify-center ">
      {userIsHost && (
      <div className="flex items-center justify-center w-full px-52">
        <div className="flex">
        <PersonIcon className="w-6 h-6 mr-2 text-green-300" />
        <p className="text-lg font-semibold text-gray-900 dark:text-black">{lessonInfo.onlineParticipants}</p>
        </div>
        <div className="flex ml-12">
        <PersonIcon className="w-6 h-6 mr-2 text-red-300" />
        <p className="text-lg font-semibold text-gray-900 dark:text-black">{lessonInfo.disconnectedParticipants}</p>

        </div>
      </div>
      )}
      <div className="flex  items-center justify-center gap-36 w-full px-52">
        <div className=" w-full">
          <Card asChild className="w-full mb-4">
            <Text as="div" size="2" weight="bold">
             {lessonInfo?.name}
            </Text>
          </Card>
          <Card  className="w-full min-h-44">
            
              <Text as="div" size="2" weight="bold">
                Session Description:
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
              <ScrollArea type="always" scrollbars="vertical" style={{ height: 500 }}>
              <div className="flex flex-col  justify-center w-full pl-24">
              <ol className="relative border-s border-gray-200 dark:border-gray-700 ">                  

              {clicks.slice().reverse().map((item) => (
               <li key={item.id} className="mb-10 ms-4">
               <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
               <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {item.clickTime.split(' ')[1].split(':')[0]}:{item.clickTime.split(' ')[1].split(':')[1]}
               </time>
               <h3 className="text-lg font-semibold text-gray-900 dark:text-black">{item.buttonName}</h3>
               <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{item.additionalText}</p>
              
           </li>
              ))}
            </ol>
          
              </div>
              </ScrollArea>
              ) : (
            <ReactionButtons
                lesson={lessonInfo}
              buttonList={{
                ahaButton: true,
                lostButton: true,
                referanceButton: true,
                commentButton: true,
                questionButton: true,
              }}
            />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Lesson;
