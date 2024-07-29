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
        <DialogPanel>
          <h1>{props.txtmodal}</h1>
          <Button className="mt-8 w-full" onClick={() => setIsOpen(false)}>
            Cerrar
          </Button>
        </DialogPanel>
      </Dialog>
    </>
  );
}
