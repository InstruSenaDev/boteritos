import React from "react";
import { Dialog, DialogPanel, Button } from "@tremor/react";

export function UpdateModal({ isOpen, onClose, children, onSave }) {
  return (
    <Dialog open={isOpen} onClose={onClose} static={true}>
      <DialogPanel className="bg-white p-6 rounded-lg max-w-xl shadow-lg mx-auto">
        <div className="space-y-4">
          <h2 className="text-title font-bold mb-4 text-darkBlue font-cocogooseRegular">Editar Información</h2>
          {children}
          <div className="flex justify-between pt-4">
            <Button
              className="w-full max-w-[250px] bg-redFull hover:bg-red-700 text-white rounded-md border-redFull hover:border-red-800"
              type="submit"
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
              className="w-full max-w-[250px] bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              type="submit"
              onClick={onSave}
            >
              Guardar
            </Button>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
