import DataState from "./dataStates/DataState";
import { objStudents } from "../../helper/objects/students";

export default function TableStudents() {


  return (
    <>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        {/*BUSCADOR Y MÁS */}

        <header>
            <div className="max-w-80 px-2 py-3 border rounded-xl border-darkBlue flex gap-2 items-center">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" className="" />
            </div>
        </header>
        
        {/* grid-cols-[200px_minmax(900px,_1fr)_100px] 
            grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px]
            50px minmax(300px, 1fr) minmax(250px, 1fr) repeat(2, minmax(100px, 1fr)) 60px;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        */}
        <section className="max-h-[80vh] overflow-y-scroll">
            {/* HEADER TABLA */}
            <div className="sticky top-0 bg-white sm:flex sm:justify-between lg:grid grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden">
            <p>No°</p>
            <p>Nombre</p>
            <p>Diagnóstico</p>
            <p>Datos</p>
            <p>Calificación</p>
            <p className="justify-self-center">Acción</p>
            </div>
            {/*CUERPO DE LA TABLA */}

            {objStudents.map((data, index) => (
            <div className="grid grid-cols-1 sm:flex sm:justify-between lg:grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px] items-center gap-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue">
              
                <p>{(index + 1).toString().length == 2 ? index + 1 : `0${index + 1}`}</p>
                <p className="underline">{`${data.nombre}  ${data.apellido}`}</p>
                <p>{data.diagnosticoMental}</p>
                <DataState state={data.datos} />
                <DataState state={data.calificado} />
                <div className="justify-self-center flex gap-3">
                  <i className="fa-solid fa-file-lines text-2xl cursor-pointer text-darkBlue"></i>
                  <i className="fa-solid fa-trash text-2xl cursor-pointer text-redFull"></i>
                </div>
            </div>
            ))}
        </section>

      </main>
    </>
  );
}
