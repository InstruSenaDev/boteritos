import { Dialog, DialogPanel, Button } from "@tremor/react";
import React from 'react';
export function ConfirmationModal({
    txtQuestion,
    txtWarning,
    isOpen,
    onClose,
    onConfirm
}) {
    return (
        <Dialog open={isOpen} onClose={onClose} static={true}>
            <DialogPanel className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg max-w-[calc(450px*2+16px)]">
                <img src="../../../public/img/Alert.png" alt="" />
                <div className="text-center mb-4">
                    <h1 className="text-title text-darkBlue font-cocogooseRegular mb-2">{txtQuestion}</h1>
                    <h2 className="text-gray-700">{txtWarning}</h2>
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                    <Button
                        className=" w-[300px] lg:w-[400px] bg-white text-darkBlue font-cocogooseRegular hover:bg-darkBlue hover:text-white"
                        type="button"
                        onClick={onClose}
                    >
                        Regresar
                    </Button>
                    <Button
                        className="w-[300px] lg:w-[400px] bg-darkBlue text-white font-cocogooseRegular hover:bg-darkBlue/80"
                        type="button"
                        onClick={() => {
                            onConfirm(); // Llama a la función de confirmación al hacer clic en Continuar
                            onClose(); // Cierra el modal después de confirmar
                        }}
                    >
                        Continuar
                    </Button>
                </div>
            </DialogPanel>
        </Dialog>
    );
}
