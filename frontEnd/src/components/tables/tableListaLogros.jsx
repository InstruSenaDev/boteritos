import DataState from "./dataStates/DataState";
import { ObjLogrosCreados } from "../../helper/objects/ListaLogros";
import Buscador from "../search/Buscador";

export default function TableListaLogros(){
  return(
    <>
      <main className="bg-white rounded-xl py-7 px-8 w-full overflow-y-hidden">
        
        {/*Buscador*/}
       <Buscador/>
      
        <section className="max-h-[80vh] overflow-y-scroll">
          {/*HEADER TABLA*/}
          <div className="sticky top-0 bg-white sm:flex sm:justify-between lg:grid grid-cols-[50px_minmax(550px,_1fr)_minmax(50px,_1fr)_minmax(150px,_1fr)_minmax(250px,1fr)] gap-x-8 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden">
            <p>No°</p>
            <p>Nombre del logro</p>
            <p>Fecha</p>
            <p>Estado</p>
            <p>Tipo</p>
            

          </div>

          {/*CUERPO DE LA TABLA */}
          {ObjLogrosCreados.map((data,index)=>(
            <div className="grid grid-cols-1 sm:flex sm:justify-between lg:grid-cols-[50px_minmax(550px,_1fr)_minmax(50px,_1fr)_minmax(150px,_1fr)_minmax(250px,1fr)] items-center gap-8 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue">
                
              <p>{(index + 1).toString().length == 2 ? index + 1 : `0${index + 1}`}</p>
              <p>{`${data.achievement}`}</p>
              <p>{`${data.date}`}</p>
              <DataState state={data.state} />
              <p>{`${data.type}`}</p>

        
            </div>
          ))}

        </section>


      </main>
    </>
  )
}