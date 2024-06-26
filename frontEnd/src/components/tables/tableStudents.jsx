import { useState } from 'preact/hooks'
import DataState from './dataStates/DataState';


export default function TableStudents({texto}){
    const [infoStudent, setInfoStudent] = useState();

    return (
        <>
            <main class="bg-white rounded-xl py-7 px-3 w-full">
                {/* HEADER TABLA */}
                <div class="grid grid-cols-7 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue">
                    <p>No°</p>
                    <p class="col-span-2">Nombre</p>
                    <p>Diagnóstico</p>
                    <p>Datos</p>
                    <p>Calificación</p>
                    <p class="justify-self-center">Acción</p>
                  
                </div>
                {/*CUERPO DE LA TABLA */}
                {}
                <div class="grid grid-cols-7 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue">

                    <p>01</p>
                    <p class="col-span-2 underline">Briand David Marín Hernandéz</p>
                    <p>Diagnostico</p>
                    <DataState texto={"Incompleto"} />
                    <p>No calificado</p>
                    <p class="justify-self-center">Iconos</p>

                </div>
                <div class="grid grid-cols-7 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue">

                    <p>01</p>
                    <p class="col-span-2 underline">Briand David Marín Hernandéz</p>
                    <p>Diagnostico</p>
                    <DataState texto={"Incompleto"} />
                    <p>No calificado</p>
                    <p class="justify-self-center">Iconos</p>
                    
                </div>
            </main>
        </>
    )
}