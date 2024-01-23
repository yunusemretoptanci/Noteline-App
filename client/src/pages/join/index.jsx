import React from "react";
import { Button} from "@radix-ui/themes";
function Join() {
  return (
    <div className="flex h-full gap-32 items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-stone-700 mb-2">
          Join the session
        </p>
        <form className="flex flex-col">
          <input
            type="text"
            placeholder="Session Code"
            className="border-2 border-gray-300 rounded-md p-2"
          />
          <Button
          className="mt-3 cursor-pointer w-full"
          color="green"
          variant="soft"
          type="submit"
        >
          Join
        </Button>
        </form>
      </div>
    </div>
  );
}

export default Join;
