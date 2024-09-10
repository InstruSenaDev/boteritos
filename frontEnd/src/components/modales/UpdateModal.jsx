import React from "react";
import { Dialog, DialogPanel, Button } from "@tremor/react";

export function UpdateModal({ isOpen, onClose, children }) {
  return (
    <Dialog open={isOpen} onClose={onClose} static={true}>
      <DialogPanel className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Editar Información</h2>
          {children}
          <div className="flex justify-end pt-4">
            <Button
              className="w-full max-w-[150px] bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              type="submit"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
