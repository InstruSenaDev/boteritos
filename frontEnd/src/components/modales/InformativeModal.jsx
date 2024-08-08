import React from 'react';
import { Button, Dialog, DialogPanel } from "@tremor/react";

export function InformativeModal({ txtmodal, cols, children, isOpen, onClose }) {
    return (
        <Dialog open={isOpen} onClose={onClose} static={true}>
            <DialogPanel className="flex flex-col gap-8 items-center lg:items-start max-w-[800px] w-full py-[40px] px-[30px]">
                <h1 className="text-title text-darkBlue text-center lg:text-left">{txtmodal}</h1>
                <div className={`grid grid-cols-1 lg:grid-cols-${cols} lg:gap-x-[30px] gap-y-[20px] items-center justify-center w-full`}>
                    {children}
                </div>
                <div className="flex justify-center w-full mt-4">
                    <Button className="max-w-[400px] w-full" onClick={onClose}>
                        
                        Cerrar
                    </Button>
                </div>
            </DialogPanel>
        </Dialog>
    );
}
