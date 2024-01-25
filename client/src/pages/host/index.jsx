import React, { useEffect, useState } from "react";
import { Button, Select } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import useLesson from "../../hooks/useLesson";
import useUserLessons from "../../hooks/useUserLessons";
import ErrorModal from "../../components/ErrorModal";
function Host() {
  const { startLesson, error } = useLesson();
  const { userLessons } = useUserLessons();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState({code: "", pin: ""});
  console.log(userLessons);
 useEffect(() => {
    if(error){
      setIsErrorModalOpen(true);
    }
  }, [error])

  const startLessonWithCode = (event) => {
    event.preventDefault();
    const code = event.target[0].value;
    const pin = event.target[1].value;
    startLesson(code, pin);
    
  };
console.log(selectedLesson);
  const hostWithSelectedLesson = () => {
    startLesson(selectedLesson.code, selectedLesson.pin)
  }
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row h-fit md:gap-32 gap-14 items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-stone-700 mb-4">
            Host one of your session
          </p>

          <Select.Root defaultValue="default"
          onValueChange={(value) => setSelectedLesson(value)}
          >
            <Select.Trigger className="!max-w-72 w-full" />
            <Select.Content position="popper">
              <Select.Item disabled value="default">Select a session</Select.Item>
              {userLessons.length > 0 ? (
                userLessons.map((lesson) => (
                  <Select.Item
                    key={lesson.id}
                    value={lesson}
                    className="flex items-center justify-between"
                  >
                   {lesson.name}
                  </Select.Item>
                ))
              ) : (
                <Select.Item disabled value="apple">No sessions</Select.Item>
              )  
              }
            </Select.Content>
          </Select.Root>

          <Button
            className="mt-3 cursor-pointer w-full"
            color="orange"
            variant="soft"
            onClick={hostWithSelectedLesson}
            disabled={selectedLesson.code === ""}
          >
            Host
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-stone-700 mb-2">
            Host another session
          </p>
          <form className="flex flex-col" onSubmit={startLessonWithCode}>
            <input
              type="text"
              placeholder="Session Code"
              className="border-2 border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              placeholder="Session Pin"
              className="border-2 border-gray-300 rounded-md p-2 mt-2"
            />
            <Button
              className="mt-3 cursor-pointer w-full"
              color="orange"
              variant="soft"
              type="submit"
            >
              Host
            </Button>
          </form>
        </div>
      </div>
      <Link to="/session-create">
        <Button
          className="mt-24 cursor-pointer "
          color="gray"
          variant="soft"
          size={"4"}
        >
          New Session
        </Button>
      </Link>
      <ErrorModal isOpen={isErrorModalOpen} setIsOpen={setIsErrorModalOpen} errText={"Invalid code/pin or lesson already started or finished"}  />
    </div>
  );
}

export default Host;
