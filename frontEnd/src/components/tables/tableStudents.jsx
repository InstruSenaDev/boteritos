import { getAllUser } from "../../api/get";
import DataState from "./dataStates/DataState";
import { useEffect, useState } from "react";

export default function TableStudents({ getId }) {
  //to={`/datoestudiante/${data.idestudiante}`}
  const [dataStudents, setDataStudents] = useState([]);

  const [openAcc, setOpenAcc] = useState(-1);
  const toogleRow = (index) => {
    setOpenAcc(openAcc !== index ? index : -1);
  };

  useEffect(() => {
    const obtainData = async () => {
      const dataApi = await getAllUser("sql/estudiantes/tabla");
      setDataStudents(dataApi.data);
    };
    obtainData();
  }, []);

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

          {dataStudents ? (
            dataStudents.map((data, index) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px] items-center gap-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue"
                key={index}
              >
                {/*Aqui se hace una conversion para añadir los ceros a la izquierda*/}
                <p>
                  {data.idestudiante.toString().length == 2
                    ? data.idestudiante
                    : `0${data.idestudiante}`}
                </p>
                <p
                  className="underline cursor-pointer"
                  onClick={() => getId(data.idestudiante)}
                >{`${data.nombre} ${data.apellido}`}</p>
                <p>{data.diagnostico}</p>
                <DataState state={data.calificado} />
                <div className="justify-self-center flex gap-3">
                  <i className="fa-solid fa-file-lines text-2xl cursor-pointer text-darkBlue"></i>
                  <i className="fa-solid fa-trash text-2xl cursor-pointer text-redFull"></i>
                </div>
              </div>
            ))
          ) : (
            <p>¡No hay estudiantes registrados!</p>
          )}
        </section>
      </main>
    </>
  );
}
