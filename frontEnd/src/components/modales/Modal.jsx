import React from "react";
import { Button, Dialog, DialogPanel } from "@tremor/react";
import { Input } from "../forms/Input";
import { Dropdown } from "../forms/Dropdown";
export function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Button className="block bg-darkBlue" onClick={() => setIsOpen(true)}>
        {props.txtboton}
      </Button>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel className="flex flex-col gap-8 items-center min-w-[800px] w-full py-[30px] px-[20px]">
          <h1 className="text-title text-darkBlue">{props.txtmodal}</h1>
          <div className="flex gap-x-8 w-full">
          <div className="flex flex-col gap-8 bg-red-50 w-full items-center ">
       
          <Input texto="Nombre completo"
            placeholder="Ingresa tu documento"
            name="ndocumento"
            tipo="text" />
          <Input texto="Número de documento"
            placeholder="Ingresa tu documento"
            name="ndocumento"
            tipo="text" /><Input texto="Número de documento"
              placeholder="Ingresa tu documento"
              name="ndocumento"
              tipo="text" />
          </div>

          <div className="flex flex-col gap-8  bg-red-50 w-full items-center ">
       
          <Input texto="Otro télefono"
            placeholder="Ingresa tu documento"
            name="ndocumento"
            tipo="text" />
          <Input texto="Número de documento"
            placeholder="Ingresa tu documento"
            name="ndocumento"
            tipo="text" /><Input texto="Número de documento"
              placeholder="Ingresa tu documento"
              name="ndocumento"
              tipo="text" />
          </div>
          </div>
          <Button className="mt-8 w-full" onClick={() => setIsOpen(false)}>
            Cerrar
          </Button>
        </DialogPanel>
      </Dialog>
    </>
  );
}
