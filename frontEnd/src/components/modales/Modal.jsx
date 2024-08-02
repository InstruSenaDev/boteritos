import React from "react";
import { Button, Dialog, DialogPanel } from "@tremor/react";
export function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Button className="block bg-darkBlue" onClick={() => setIsOpen(true)}>
        {props.txtboton}
      </Button>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel className="flex flex-col gap-8 items-start min-w-[800px] w-full py-[40px] px-[30px]">
          <h1 className="text-title text-darkBlue">{props.txtmodal}</h1>
          <div className="w-full">
            {props.children}
          </div>
          <div className="flex justify-center w-full">
          <Button className="max-w-[400px] w-full" onClick={() => setIsOpen(false)}>
            {props.txtbutton2}
          </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
