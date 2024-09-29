import React from "react";
import { Button, Dialog, DialogPanel } from "@tremor/react";

export function Modal({ isOpen, onClose, onConfirm, txtmodal, txtboton, txtbutton2 }) {
  return (
    <Dialog open={isOpen} onClose={onClose} static={true}>
      <DialogPanel className="flex flex-col gap-8 items-center w-full py-[40px] px-[30px]">
        <h1 className="text-title font-cocogooseRegular text-darkBlue">{txtmodal}</h1>
        <div className="flex justify-center w-full">
          <Button className="max-w-[400px] w-full" onClick={onConfirm}>
            {txtbutton2}
          </Button>
        </div>
        <div className="flex justify-center w-full">
          <Button className="max-w-[400px] w-full" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
