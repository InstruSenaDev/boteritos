import { ObjLogros } from "../../helper/objects/logrosCalificar"


export default function TableCalificarEstudiante(){
  return(
    <>
      <main className="bg-white rounded-xl py-7 px-8 w-full overflow-y-hidden">
        
        {/*Buscador*/}
        <header>
          <div className="max-w-80 px-2 py-3 border rounded-xl border-darkBlue flex gap-2 items-center">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" className="" />
          </div>
        </header>
      
        <section className="max-h-[80vh] overflow-y-scroll">
          {/*HEADER TABLA*/}
          <div className="sticky top-0 bg-white sm:grid grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden">
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
            <div className="grid grid-cols-1 sm:grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px] items-center gap-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue">
                
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