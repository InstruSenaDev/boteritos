import { getAllUser } from "../../api/get";
import DataState from "./dataStates/DataState";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TableStudents() {
  //  const [dataStudents, setDataStudents] = useState([]);
  const [openAcc, setOpenAcc] = useState(-1);
  const toogleRow = (index) => {
    setOpenAcc(openAcc !== index ? index : -1);
  };


  const dataStudents = [
    {
      idestudiante: 1,
      nombre: "Juan jose",
      diagnostico: "DOWN",
      calificado: "true",
    },
  ];

  // useEffect(() => {
  //   const obtainData = async () => {
  //     try {
  //       const dataApi = await getAllUser('usuarios');

  //       if (Array.isArray(dataApi.data)) {
  //         setDataStudents(dataApi.data);
  //       } else {
  //         console.error('Los datos recibidos no son un array', dataApi.data);
  //         setDataStudents([]);
  //       }
  //     } catch (error) {
  //       console.error('Error al obtener los datos', error);
  //       setDataStudents([]);
  //     }
  //   };
  //   obtainData();
  // }, []);

  return (
    <>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        {/*BUSCADOR Y MÁS */}

        <header>
          <div className="max-w-80 px-2 py-3 border rounded-xl border-darkBlue flex gap-2 items-center">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" className="w-full" />
          </div>
        </header>

        {/* grid-cols-[200px_minmax(900px,_1fr)_100px] 
            grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px]
            50px minmax(300px, 1fr) minmax(250px, 1fr) repeat(2, minmax(100px, 1fr)) 60px;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        */}
        <section className="max-h-[80vh] overflow-y-scroll">
          {/* HEADER TABLA */}
          <div className="sticky top-0 lg:grid grid-cols-[150px_minmax(350px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden">
            <p>No°</p>
            <p>Nombre</p>
            <p>Diagnóstico</p>
            <p>Calificación</p>
            <p>Acción</p>
          </div>
          {/*CUERPO DE LA TABLA */}

          {dataStudents.map((data, index) => (
             <div
             className={`acc-item grid grid-cols-1 lg:grid-cols-[150px_minmax(350px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] items-center gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${
               openAcc === index ? "open" : "close"
             }`}
             key={index}
           >
              {/*Aqui se hace una conversion para añadir los ceros a la izquierda*/}
              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">No°:</p>
                <div className="acc-header w-full flex justify-between items-center ">
                  <p>
                    {data.idestudiante.toString().length == 2
                      ? data.idestudiante
                      : `0${data.idestudiante}`}
                  </p>
                  <button onClick={() => toogleRow(index)}>
                    <i className="fa-solid fa-angle-down block lg:hidden"></i>
                  </button>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Nombre:</p>
                <div className="acc-header w-full flex justify-between items-center ">
                  <Link to={`/datoestudiante/${data.idestudiante}`}>
                    <p className="underline cursor-pointer">{`${data.nombre}`}</p>
                  </Link>
                </div>
              </div>

              <div className="acc-header flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Diagnostico:</p>
                <div className="w-full flex justify-between items-center ">
                  <p>{data.diagnostico}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Calificación:</p>
                <div className="w-full flex justify-between items-center ">
                  <DataState state={data.calificado} />
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Acción:</p>
                <div className="w-full flex justify-between items-center ">
                  <div className="justify-self-center flex gap-3">
                    <i className="fa-solid fa-file-lines text-2xl cursor-pointer text-darkBlue"></i>
                    <i className="fa-solid fa-trash text-2xl cursor-pointer text-redFull"></i>
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
