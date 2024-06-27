import { useState } from "preact/hooks";
import DataState from "./dataStates/DataState";
import { objStudents } from "../../helper/objects/students";

export default function TableStudents() {
  const [infoStudent, setInfoStudent] = useState();

  return (
    <>
      <main class="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        {/*BUSCADOR Y MÁS */}

        <header>
            <div class="max-w-80 px-2 py-3 border rounded-xl border-darkBlue flex gap-2 items-center">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" class="" />
            </div>
        </header>
        {/* HEADER TABLA */}
        {/* grid-cols-[200px_minmax(900px,_1fr)_100px] 
            grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px]
            50px minmax(300px, 1fr) minmax(250px, 1fr) repeat(2, minmax(100px, 1fr)) 60px;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        */}
        <section class="max-h-[80vh] overflow-y-scroll">

            <div class="sticky top-0 bg-white grid grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue">
            <p>No°</p>
            <p>Nombre</p>
            <p>Diagnóstico</p>
            <p>Datos</p>
            <p>Calificación</p>
            <p class="justify-self-center">Acción</p>
            </div>
            {/*CUERPO DE LA TABLA */}

            {objStudents.map((data, index) => (
            <div class="grid grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px] gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue">
                <p>{index.toString().length == 2 ? index + 1 : `0${index + 1}`}</p>
                <p class="underline">{`${data.nombre}  ${data.apellido}`}</p>
                <p>{data.diagnosticoMental}</p>
                <DataState state={data.datos} />
                <DataState state={data.calificado} />
                <p class="justify-self-center">Iconos</p>
            </div>
            ))}
        </section>

      </main>
    </>
  );
}
