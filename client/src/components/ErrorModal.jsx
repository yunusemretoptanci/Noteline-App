import React from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
function ErrorModal({isOpen,setIsOpen,errText}) {

  return (
    <Dialog.Root
    open={isOpen}
    onOpenChange={setIsOpen}
  >

    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow">
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-xl">
            Error!
          </Dialog.Title>
          <Dialog.Close className="text-gray-400 hover:text-gray-500">
            <Cross1Icon />
          </Dialog.Close>
        </div>


          <div className="text-red-500 text-sm mt-4">
            {errText}
          </div>

        <div className="mt-8 space-x-6 text-right">
          <Dialog.Close className="rounded px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600">
            Close
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  )
}

export default ErrorModal