import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useLesson from "../../hooks/useLesson";
import useButtonClick from "../../hooks/useButtonClick";
import { Text, Card, ScrollArea, Table } from "@radix-ui/themes";
function LessonSummary() {
  let { lessonCode } = useParams();
  const { getLessonInfo, lessonInfo } = useLesson();
  const { getClicks, clicks } = useButtonClick();
  useEffect(() => {
    getLessonInfo(lessonCode);
    getClicks(lessonCode);
  }, []);
  console.log(lessonInfo);
  console.log(clicks);
  const defaultButtonNames = {
    Aha: "Aha!",
    Lost: "I'm Lost",
    Referance: "Referance",
    Comment: "Comment",
    Question: "Question",
  };
  const buttonClickCounts = {
    Aha: 0,
    Lost: 0,
    Referance: 0,
    Comment: 0,
    Question: 0,
  };
  clicks?.forEach((click) => {
    buttonClickCounts[click.buttonName] += click.clickCount;
  });

  console.log(buttonClickCounts);

  return (
    <div className="h-full flex flex-col items-center justify-center">
        <p className="text-2xl font-medium mb-24">Participant Count: {lessonInfo?.onlineParticipants+lessonInfo?.disconnectedParticipants}</p>
        <div className="flex items-center justify-center w-full">
      <div className="flex  items-center justify-center gap-36 w-full px-52">
        <div className=" w-full">
          <Card asChild className="w-full mb-4">
            <Text as="div" size="2" weight="bold">
              {lessonInfo?.name}
            </Text>
          </Card>
          <Card className="w-full min-h-44">
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
        <div className="w-full">
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {Object.keys(buttonClickCounts).map((key) => (
                <Table.Row>
                  <Table.RowHeaderCell>
                    {defaultButtonNames[key]}
                  </Table.RowHeaderCell>
                  <Table.Cell>{buttonClickCounts[key]}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
      </div>
    </div>
  );
}

export default LessonSummary;
