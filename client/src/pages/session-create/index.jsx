import React, { useState } from "react";
import {
  TextArea,
  Button,
  Select,
} from "@radix-ui/themes";
import ReactionButtons from "../../components/ReactionButtons";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import useButtonList from "../../hooks/useButtonList";
import useCreateLesson from "../../hooks/useCreateLesson";

function SessionCreate() {
 
  const [isPreview, setIsPreview] = useState(false);
  const [buttonList, addNewButtonList] = useButtonList();
  const [addNewButtonListDialogOpen, setAddNewButtonListDialogOpen] =
    useState(false);
  const [selectedButtonList, setSelectedButtonList] = useState({
    ahaButton: true,
    lostButton: true,
    referanceButton: true,
    commentButton: true,
    questionButton: true,
  });
  const [sessionName, setSessionName] = useState("");
  const [sessionDescription, setSessionDescription] = useState("");

  const [
    newButtonListSelectedCheckboxValues,
    setNewButtonListSelectedCheckboxValues,
  ] = useState([]);
  const [newButtonListName, setNewButtonListName] = useState("");
  const [newButtonListIsValid, setNewButtonListIsValid] = useState(true);
  const {createLesson} = useCreateLesson();
  //selecting new button for new button list on modal
  const onNewButtonSelect = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    if (checked) {
      setNewButtonListSelectedCheckboxValues((prevValues) => [
        ...prevValues,
        value,
      ]);
    } else {
      setNewButtonListSelectedCheckboxValues((prevValues) =>
        prevValues.filter((val) => val !== value)
      );
    }
  };

  //saving new button list to local storage
  const saveNewButtonList = () => {
    if (newButtonListName == "" || newButtonListSelectedCheckboxValues == []) {
      setNewButtonListIsValid(false);
      return;
    }

    const newButtonList = {
      name: newButtonListName,
      buttons: newButtonListSelectedCheckboxValues,
    };

    addNewButtonList(newButtonList);
    setNewButtonListName("");
    setNewButtonListSelectedCheckboxValues([]);
    setAddNewButtonListDialogOpen(false);
  };

  //name of the select element for show full button name
  const defaultButtonNames = [
    "Aha!",
    "I'm Lost",
    "Referernce",
    "Comment",
    "Question",
  ];

  //mapping button names to key for use in selectedButtonList select and querry from local storage
  const buttonNamesToKey = {
    "Aha!": "ahaButton",
    "I'm Lost": "lostButton",
    Referernce: "referanceButton",
    Comment: "commentButton",
    Question: "questionButton",
  };

  //selecting button list from select element
  const onButtonListSelectChange = (e) => {
    const { value } = e.target;
    if (value === "default") {
      setSelectedButtonList({
        ahaButton: true,
        lostButton: true,
        referanceButton: true,
        commentButton: true,
        questionButton: true,
      });
      return;
    }

    const selectedButtonList = buttonList.find(
      (buttonList) => buttonList.name === value
    );
    setSelectedButtonList(
      selectedButtonList.buttons.reduce((acc, button) => {
        acc[button] = true;
        return acc;
      }, {})
    );
  };

  //creating session
  const createSession = () => {
    /* only true values of selectedButtonList */
    const selectedButtons = Object.keys(selectedButtonList).filter(
      (key) => selectedButtonList[key]
    );
    console.log(selectedButtons);
    const lesson = {
      name: sessionName,
      description: sessionDescription,
      buttonList: selectedButtons
    };
    createLesson(lesson);
  };

  return (
    <div className="flex flex-col h-full items-center justify-center ">
      <div className="flex  items-center justify-center gap-36 w-full px-52">
        <div className=" w-full">
          <input
          disabled={isPreview}
            type="text"
            placeholder="Session Name"
            className="border-2 border-gray-300 rounded-md p-2 w-full mb-4"
            onChange={(e) => setSessionName(e.target.value)}
          />
          <TextArea
          disabled={isPreview}
            size="3"
            placeholder="Session Description"
            className="min-h-44"
            onChange={(e) => setSessionDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          {!isPreview && (
            <>
              <Select.Root
                defaultValue="default"
                onValueChange={(value) =>
                  onButtonListSelectChange({ target: { name, value } })
                }
              >
                <Select.Trigger className="!max-w-72" />
                <Select.Content position="popper">
                  <Select.Item value="default">Default button list</Select.Item>
                  {buttonList.map((buttonList) => (
                    <Select.Item
                    key={buttonList.name}
                    value={buttonList.name}>
                      {buttonList.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              <Dialog.Root
                open={addNewButtonListDialogOpen}
                onOpenChange={setAddNewButtonListDialogOpen}
              >
                <Dialog.Trigger>
                  <Button
                    className="mt-3 cursor-pointer "
                    color="teal"
                    variant="soft"
                  >
                    Add New Button List
                  </Button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                  <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow">
                    <div className="flex items-center justify-between">
                      <Dialog.Title className="text-xl">
                        Add New Button List
                      </Dialog.Title>
                      <Dialog.Close className="text-gray-400 hover:text-gray-500">
                        <Cross1Icon />
                      </Dialog.Close>
                    </div>

                    <div className="mt-6">
                      <input
                        type="text"
                        placeholder="Button List Name"
                        className="border-2 border-gray-300 rounded-md p-2 w-full mb-4"
                        onChange={(e) => setNewButtonListName(e.target.value)}
                      />
                      <div className="flex flex-col items-center justify-center mt-8">
                        {defaultButtonNames.map((buttonName) => (
                          <div
                            key={buttonName}
                            className="flex items-center justify-center gap-4 mb-4"
                          >
                            <input
                              disabled
                              className="border-2 border-gray-300 rounded-md p-2 w-72"
                              value={buttonName}
                            />
                            <input
                              type="checkbox"
                              className="w-4 h-4"
                              value={buttonNamesToKey[buttonName]}
                              onChange={onNewButtonSelect}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    {!newButtonListIsValid && (
                      <div className="text-red-500 text-sm mt-4">
                        Please fill the name and select at least one button.
                      </div>
                    )}
                    <div className="mt-8 space-x-6 text-right">
                      <Dialog.Close className="rounded px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600">
                        Cancel
                      </Dialog.Close>
                      <button
                        className="rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
                        onClick={saveNewButtonList}
                      >
                        Save
                      </button>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </>
          )}

          <div className="flex w-full flex-col items-center justify-center mt-8">
            <ReactionButtons buttonList={selectedButtonList} />
          </div>
        </div>
      </div>
      {!isPreview && (
        <Button
          className="mt-10 cursor-pointer "
          color="gray"
          variant="soft"
          size={"4"}
          onClick={() => setIsPreview(!isPreview)}
        >
          Preview
        </Button>
      )}
      {isPreview && (
        <div className="flex items-center justify-center mt-8 gap-8">
          <Button
            className="mt-6 cursor-pointer "
            color="gray"
            variant="soft"
            size={"4"}
            onClick={() => setIsPreview(!isPreview)}
          >
            Edit
          </Button>
          <Button
            className="mt-6 cursor-pointer "
            color="teal"
            variant="soft"
            size={"4"}
            onClick={createSession}
          >
            Create Session
          </Button>
        </div>
      )}
    </div>
  );
}

export default SessionCreate;
