import { Dialog, DialogPanel, Button } from "@tremor/react";

import React from 'react'

export function ConfirmationModal({
    txtQuestion,
    txtWarning,
    isOpen,
    onClose
}) {
    return (
        <>
            <Dialog open={isOpen} onClose={onClose} static={true}>
                <DialogPanel className="flex justify-center items-center flex-col gap-5">
                    <div>
                        <h1 className="text-title text-darkBlue font-cocogooseRegular text-center">{txtQuestion}</h1>
                        <h2>{txtWarning}</h2>
                    </div>
                    <Button
                        className="max-w-[400px] w-full"
                        type="submit"
                        onClick={onClose}
                    >
                        Cerrar
                    </Button>
                </DialogPanel>
            </Dialog>
        </>
    );
}
