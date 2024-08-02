import React from 'react'
import { Button, Dialog, DialogPanel } from "@tremor/react";

export function InformativeModal() {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <>
        <Button className="block bg-darkBlue" onClick={()=>setIsOpen(true)}>

        </Button>
        </>
    )
}
