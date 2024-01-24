import React from "react";
import ReactionButtons from "../../components/ReactionButtons";
import { TextArea, Text, Card,ScrollArea } from "@radix-ui/themes";
function Lesson() {
  return (
    <div className="flex flex-col h-full items-center justify-center ">
      <div className="flex  items-center justify-center gap-36 w-full px-52">
        <div className=" w-full">
          <Card asChild className="w-full mb-4">
            <Text as="div" size="2" weight="bold">
              Quick start
            </Text>
          </Card>
          <Card asChild className="w-full min-h-44">
            <a href="#">
              <Text as="div" size="2" weight="bold">
                Session Description:
              </Text>
              <ScrollArea
                type="always"
                scrollbars="vertical"
                style={{ height: 180 }}
              >
                <Text as="div" color="gray" size="2">
                Start building your next project in minutesStart building your next pro
                </Text>
              </ScrollArea>
            </a>
          </Card>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex w-full flex-col items-center justify-center mt-8">
            <ReactionButtons
              buttonList={{
                ahaButton: true,
                lostButton: true,
                referanceButton: true,
                commentButton: true,
                questionButton: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lesson;
