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
        <DialogPanel className="flex flex-col gap-8 items-center w-full py-[40px] px-[30px]">
          <h1 className="text-title font-cocogooseRegular text-darkBlue">{props.txtmodal}</h1>
          <div className="w-full flex justify-center">
            <div className={`w-full grid grid-cols-1 lg:grid-cols-${props.cols} lg:gap-x-[30px] gap-y-[20px] items-center justify-items-center`}>
              {props.children}
            </div>
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
