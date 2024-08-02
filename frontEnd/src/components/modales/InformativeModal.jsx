import React from 'react'
import { Button, Dialog, DialogPanel } from "@tremor/react";

export function InformativeModal(props) {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <>
            <Button className="block bg-darkBlue" onClick={() => setIsOpen(true)}>

            </Button>
            
            <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
                <DialogPanel className="flex flex-col gap-8 items-center lg:items-start max-w-[800px] w-full py-[40px] px-[30px]">
                    <h1>{props.txtmodal}</h1>
                    <div className={`grid grid-cols-1 lg:grid-cols-${props.cols} lg:gap-x-[30px] gap-y-[20px]`}>
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
    )
}
