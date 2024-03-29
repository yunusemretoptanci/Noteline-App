import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useLesson from "../../hooks/useLesson";
import useButtonClick from "../../hooks/useButtonClick";
import { Text, Card, ScrollArea, Table } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
function OnlineSummary() {
  let { lessonCode } = useParams();
  const { t } = useTranslation();
  const { getLessonInfo, lessonInfo } = useLesson();
  const { getClicks, clicks } = useButtonClick();
  useEffect(() => {
    getLessonInfo(lessonCode);
    getClicks(lessonCode);
  }, []);

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


  return (
    <div className="h-full flex flex-col items-center justify-center pt-6">
      <p className="text-2xl font-medium md:mb-24 mb-3">
        {t("lessonSummary.participantCount")}{" "}
        {lessonInfo?.onlineParticipants + lessonInfo?.disconnectedParticipants}
      </p>
      <div className="flex items-center justify-center w-full">
        <div className="flex md:flex-row flex-col items-center justify-center md:gap:36 gap-3 w-full md:px-52 px-3">
          <div className=" w-full">
            <Card asChild className="w-full mb-4">
              <Text as="div" size="2" weight="bold">
                {lessonInfo?.name}
              </Text>
            </Card>
            <Card className="w-full min-h-44">
              <Text as="div" size="2" weight="bold">
              {t("lessonSummary.sessionDescription")}
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
                  <Table.ColumnHeaderCell>{t("lessonSummary.type")}</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>{t("lessonSummary.total")}</Table.ColumnHeaderCell>
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

export default OnlineSummary;
