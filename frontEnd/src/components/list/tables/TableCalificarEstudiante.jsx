import { useState } from "react"
import { ObjLogros } from "../../../helper/objects/logrosCalificar"
import Buscador from "../../search/Buscador"
import { useParams } from "react-router-dom";


export default function TableCalificarEstudiante({setSelectedLogros}) {
  const { id } = useParams();
  const [openAcc, setOpenAcc] = useState(-1);
  const [selectedLogros, setLocalSelectedLogros] = useState({});

  const handleRadioChange = (idLogro, resultado) => {
    const date = new Date().toISOString().split('T')[0]; 
    const newSelection = {
      ...selectedLogros,
      [idLogro]: { idEstudiante: id, idLogroEstudiante: idLogro, resultado, fecha: date },
    };

    setLocalSelectedLogros(newSelection);
    setSelectedLogros(newSelection); //para actualizar en el componente padre(calificar)
    console.log("Selecciones actualizadas:", newSelection);
  };

  const toogleRow = (index) => {
    openAcc !== index ? setOpenAcc(index) : setOpenAcc(-1);
  };

  return (
    <>
      <main className="bg-white rounded-xl py-7 px-8 w-full overflow-y-hidden">

        {/* Buscador */}
        <Buscador />

        <section className="max-h-[80vh] overflow-y-scroll">
          {/* HEADER TABLA */}
          <div className="sticky top-0 hidden bg-white lg:grid lg:grid-cols-[50px_minmax(550px,_1fr)_minmax(150px,_1fr)_minmax(250px,_1fr)] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue">
            <p>No°</p>
            <p>Nombre del logro</p>
            <p className="flex justify-self-center">Fecha</p>

            <div className="flex justify-around w-full max-w-[250px] flex-auto justify-self-center">
              <p>LA</p>
              <p>LP</p>
              <p>LN</p>
            </div>

          </div>

          {/* CUERPO DE LA TABLA */}
          {ObjLogros.map((data, index) => (
            <div className={`acc-item lg:grid grid-cols-1 lg:grid-cols-[50px_minmax(550px,_1fr)_minmax(150px,_1fr)_minmax(250px,_1fr)] items-center gap-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${openAcc === index ? "open" : "close"}`} key={index}>
              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">No°:</p>
                <div className="acc-header w-full flex justify-between items-center ">
                  <p>{(index + 1).toString().length === 2 ? index + 1 : `0${index + 1}`}</p>
                  <button onClick={() => toogleRow(index)}><i className="fa-solid fa-angle-down block lg:hidden"></i></button>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Nombre del logro:</p>
                <div className="flex justify-self-center acc-header">
                  <p>{`${data.achievement}`}</p>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body lg:justify-center">
                <p className="text-darkBlue lg:hidden">Fecha</p>
                <div className="flex justify-self-center">
                  <p>{`${data.fecha}`}</p>
                </div>
              </div>

              <div className="flex pl-4 gap-2 lg:gap-0 acc-body lg:justify-center acc-body">
                <div className="flex flex-col gap-2 justify-around w-full max-w-[250px] lg:flex-auto lg:justify-self-center lg:gap-0 lg:flex-row ">
                  <div className="flex justify-around w-full max-w-[250px] flex-auto justify-self-center">
                    <label htmlFor={`la-${index}`} className="pr-5 text-darkBlue lg:hidden">
                      LA
                    </label>
                    <input id={`la-${index}`} name={`logro-${data.idLogroEstudiante}`} type="radio" className="w-4 h-4" 
                    onChange={()=>handleRadioChange(data.idLogroEstudiante,"LA")}/>

                    <label htmlFor={`lp-${index}`} className="pr-5 text-darkBlue lg:hidden">
                      LP
                    </label>
                    <input id={`lp-${index}`} name={`logro-${data.idLogroEstudiante}`} type="radio" className="w-4 h-4"
                    onChange={()=>handleRadioChange(data.idLogroEstudiante,"LP")} />

                    <label htmlFor={`ln-${index}`} className="pr-5 text-darkBlue lg:hidden">
                      LN
                    </label>
                    <input id={`ln-${index}`} name={`logro-${data.idLogroEstudiante}`} type="radio" className="w-4 h-4"
                    onChange={()=>handleRadioChange(data.idLogroEstudiante,"LN")} />
                  </div>
                </div>
              </div>

            </div>
          ))}

        </section>
      </main>


      
    </>
  );
}