import { Button } from "@radix-ui/themes";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function CreatedSessionPreview() {
  const { state } = useLocation();
  console.log(state);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full ">
        <div className="border-2 border-gray-200 rounded-lg p-8">
          <p className="text-2xl font-medium">
            Session Name:{" "}
            <span className="text-2xl font-light"> {state.name}</span>
          </p>
          <p className="text-2xl font-medium mt-8">
            Session Description:{" "}
            <span className="text-2xl font-light"> {state.description}</span>
          </p>

          <h2 className="text-2xl font-normal mt-8 my-12 text-green-500">
            Your session has been created.
          </h2>

          <div className="flex  justify-between mt-8">
            <p className="text-2xl font-normal">
              Join With Code:</p>
            <p className="text-2xl font-light text-green-600"> {state.code}</p>
          </div>
          <div className="flex justify-between mt-8">
            <p className="text-2xl font-normal"> Pin </p>
            <p className="text-2xl font-light text-red-600 "> {state.pin}</p>
          </div>
        </div>

        <div className="flex gap-32">
        <Button
                    className="mt-3 cursor-pointer "
                    color="orange"
                    variant="soft"
                    size={"4"}
                  >
                    Host Now
         </Button>

        <Link to="/">
         <Button
                    className="mt-3 cursor-pointer "
                    color="green"
                    variant="soft"
                    size={"4"}
                  >
                    Save for later
          </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CreatedSessionPreview;
