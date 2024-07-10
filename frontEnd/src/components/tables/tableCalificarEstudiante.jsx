import { ObjLogros } from "../../helper/objects/logrosCalificar"
import Buscador from "../search/Buscador"


export default function TableCalificarEstudiante(){
  return(
    <>
      <main className="bg-white rounded-xl py-7 px-8 w-full overflow-y-hidden">
        
        {/*Buscador*/}
       <Buscador/>
      
        <section className="max-h-[80vh] overflow-y-scroll">
          {/*HEADER TABLA*/}
          <div className="sticky top-0 bg-white sm:grid grid-cols-[50px_minmax(550px,_1fr)_minmax(150px,_1fr)_minmax(250px,_1fr)] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden">
            <p>No°</p>
            <p>Nombre del logro</p>
            <p>Fecha</p>

            <div class="flex justify-around w-full max-w-[250px] flex-auto">
              <p>LA</p>
              <p>LP</p>
              <p>LN</p>
            </div>

          </div>

          {/*CUERPO DE LA TABLA */}
          {ObjLogros.map((data,index)=>(
            <div className="grid grid-cols-1 sm:grid-cols-[50px_minmax(550px,_1fr)_minmax(150px,_1fr)_minmax(250px,_1fr)] items-center gap-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue">
                
              <p>{(index + 1).toString().length == 2 ? index + 1 : `0${index + 1}`}</p>
              <p>{`${data.achievement}`}</p>
              <p>{`${data.date}`}</p>

              <div class="flex justify-around w-full max-w-[250px] flex-auto">
                <div class=" w-full max-w-5 flex justify-center items-center"><input type="checkbox" class="w-4 h-4 "/></div> 
                <div class=" w-full max-w-5 flex justify-center items-center"><input type="checkbox" class="w-4 h-4"/></div> 
                <div class=" w-full max-w-5 flex justify-center items-center"><input type="checkbox" class="w-4 h-4"/></div> 
              </div>
            </div>
          ))}

        </section>


      </main>
    </>
  )
}