import React from "react";
import { Button,Select } from "@radix-ui/themes";
function Host() {
  return (
    <div className="flex h-full gap-32 items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-stone-700 mb-4">
          Host one of your session
        </p>

        <Select.Root defaultValue="apple">
          <Select.Trigger className="!max-w-72" />
          <Select.Content position="popper">
            <Select.Item value="apple">
              ApplAppleAppleAppleAppleAppleAppleAppleAppleAppleAppleAppleAppleeAppleAppleApple
            </Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Button
          className="mt-3 cursor-pointer w-full"
          color="orange"
          variant="soft"
        >
          Host
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-stone-700 mb-2">
          Host another session
        </p>
        <form className="flex flex-col">
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
  );
}

export default Host;
