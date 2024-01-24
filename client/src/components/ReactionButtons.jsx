import React from "react";
import { Button } from "@radix-ui/themes";
function ReactionButtons({ buttonList }) {
  console;
  return (
    <>
      {buttonList.ahaButton && (
        <Button
          className="mt-3 cursor-pointer w-full"
          color="orange"
          variant="soft"
        >
          Aha
        </Button>
      )}
      {buttonList.lostButton && (
        <Button
          className="mt-3 cursor-pointer w-full"
          color="orange"
          variant="soft"
        >
          Lost
        </Button>
      )}
      {buttonList.referanceButton && (
        <Button
          className="mt-3 cursor-pointer w-full"
          color="orange"
          variant="soft"
        >
          Referance
        </Button>
      )}
      {buttonList.commentButton && (
        <Button
          className="mt-3 cursor-pointer w-full"
          color="orange"
          variant="soft"
        >
          Comment
        </Button>
      )}
      {buttonList.questionButton && (
        <Button
          className="mt-3 cursor-pointer w-full"
          color="orange"
          variant="soft"
        >
          Question
        </Button>
      )}
    </>
  );
}

export default ReactionButtons;
