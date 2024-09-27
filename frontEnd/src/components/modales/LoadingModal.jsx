import React from "react";
import { Dialog, DialogPanel } from "@tremor/react";
import { ElementLoader } from "../loaders/ElementLoader";

export function LoadingModal({
    isOpen,
    onClose, 
     }) {
    return (
      <Dialog open={isOpen} onClose={onClose} static={true}>
        <DialogPanel className="bg-white px-6 py-8 rounded-lg max-w-[370px] w-full shadow-lg mx-auto">
          <div className="space-y-4 flex flex-col items-center justify-center">
            <ElementLoader/>
            <p className="font-cocogooseLight text-paragraph2 text-center text-black">Espera mientras se genera el informe, este proceso puede durar dependiendo de la velocidad de tu internet.</p>
          </div>
        </DialogPanel>
      </Dialog>
    );
  }
  