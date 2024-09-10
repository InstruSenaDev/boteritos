import React from "react";
import { LayoutGeneral } from "../../layouts/LayoutGeneral.jsx";

const Index = () => {
    return (
        <LayoutGeneral titleHeader={"Profesor"}>
            <div className='flex justify-center'>
                <p className='font-cocogooseSemiLight text-darkBlue text-title'>¡Bienvenido profesor!</p>
            </div>
        </LayoutGeneral>
    )
}
export default Index;