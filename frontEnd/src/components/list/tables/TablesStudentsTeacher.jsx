
import { useState, useEffect } from "react";
import Buscador from "../../search/Buscador";
import DataState from "../dataStates/DataState";
import { getAllUser } from "../../../api/get";


export default function TablesStudentsTeacher({getId}) {

const [dataStudents, setDataStudents] = useState([]);

  const [openAcc, setOpenAcc] = useState(-1);

  const toogleRow = (index) => {
    openAcc != index ? setOpenAcc(index) : setOpenAcc(-1);
  }

  useEffect(() => {
    const obtainData = async () => {
      const dataApi = await getAllUser("sql/estudiantes/tabla");
      console.log(dataApi);
      setDataStudents(dataApi.data);
    };
    obtainData();
  }, []);

  return (
    <>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        {/*buscador*/}
        {/*<Buscador/>*/}
        <header className="flex justify-center sm:flex sm:justify-start">
          <Buscador  />
        </header>

        <section className="max-h-[80vh] overflow-y-scroll ">
          {/* HEADER TABLA */}
          <div className="sticky top-0 lg:grid grid-cols-[150px_minmax(350px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue bg-white hidden">
            <p>No°</p>
            <p>Nombre</p>
            <p>Diagnóstico</p>
            <p >Calificación</p>
            <p >Area</p>
          </div>

          {/*CUERPO DE LA TABLA */}
      {dataStudents ? (
        dataStudents.map((data, index)=>(
          <div
          className={`acc-item grid grid-cols-1 lg:grid-cols-[150px_minmax(350px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] items-center gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${
            openAcc === index ? "open" : "close"
          }`}
          key={index}
        >
            <div className="flex gap-2 lg:gap-0">
              <p className="text-darkBlue lg:hidden">No°:</p>
              <div className="acc-header w-full flex justify-between items-center">
                <p>
                  {(index + 1).toString().length == 2
                    ? index + 1
                    : `0${index + 1}`}
                </p>
                <button onClick={() => toogleRow(index)}><i className="fa-solid fa-angle-down block lg:hidden"></i></button>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-0 ">
              <p className="text-darkBlue lg:hidden">Nombre:</p>
              <div className=" flex justify-self-center acc-header">
                <p className="underline cursor-pointer"  onClick={() => getId(data.idestudiante)}>{`${data.nombre} ${data.apellido}`}</p>
              </div>
            </div>

            <div className="flex gap-2 lg:gap-0 acc-body ">
              <p className="text-darkBlue lg:hidden">Diagnostico:</p>
              <div className="flex justify-self-center">
                <p>{data.diagnostico}</p>
              </div>
            </div>

            <div className="acc-body flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Calificación:</p>
                <div className="w-full flex justify-between items-center">
                  <DataState state={data.calificado} />
                </div>
              </div>
            
            <div className="flex gap-2 lg:gap-0 acc-body">
              <p className="text-darkBlue lg:hidden">Area:</p>
              <div className="flex justify-self-center">
                <p className="justify-self-center">{`${data.area}`}</p>
              </div>
            </div>
          </div>
        ))
      ):(
        <p>¡No hay estudiantes registrados!</p>
      )}
        </section>
        </main>
    </>
  );
}