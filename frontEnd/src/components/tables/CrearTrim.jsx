import { Button } from "@tremor/react";
import React, { useState } from "react";
import InputTrimestre from "../forms/InputTrimestre";

const CrearTrim = () => {
  const [trimestres, setTrimestres] = useState([
    { id: 1, inicio: "", fin: "" },
    { id: 2, inicio: "", fin: "" },
    { id: 3, inicio: "", fin: "" },
  ]);
  const [mensajeError, setMensajeError] = useState("");

  const agregarTrimestre = () => {
    // Validar si ya hay 4 trimestres
    if (trimestres.length >= 4) {
      setMensajeError("No puedes crear más de 4 trimestres");
      return;
    }
    setMensajeError(""); // Limpiar el mensaje de error si se puede agregar
    setTrimestres([...trimestres, trimestres.length + 1]);
  };

  const eliminarTrimestre = (index) => {
    // Validar si hay menos de 3 trimestres
    if (trimestres.length <= 3) {
      setMensajeError("Debe haber al menos 3 trimestres");
      return;
    }
    setMensajeError(""); // Limpiar el mensaje de error si se puede eliminar
    const nuevosTrimestres = trimestres.filter((_, i) => i !== index);
    setTrimestres(nuevosTrimestres);
  };

  const handleTrimestreChange = (index, field, value) => {
    const nuevosTrimestres = [...trimestres];
    nuevosTrimestres[index][field] = value;
    setTrimestres(nuevosTrimestres);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const hasEmptyFields = trimestres.some(
      (trimestre) => !trimestre.inicio || !trimestre.fin
    );

    if (hasEmptyFields) {
      setMensajeError(
        "Todos los trimestres deben tener fechas de inicio y fin."
      );
      return;
    }
    setMensajeError("");
    console.log("Datos de los trimestres:", trimestres);
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <main className="bg-white rounded-xl py-7 px-8 w-fit h-full space-y-5 ">
        <div className="w-full text-center ">
          <h1 className="text-darkBlue font-cocogooseRegular text-title">
            No hay Trimestres Creados
          </h1>
          <h2 className="text-paragraph font-cocogooseLight text-center">
            Por favor crea los trimestres con los que trabajarás en el año. Esto
            hará que el sistema funcione correctamente.
          </h2>
        </div>

        {mensajeError && (
          <div className="text-red-500 font-semibold text-center">
            {mensajeError}
          </div>
        )}

        <div className="flex flex-col gap-5 justify-items-center items-center">
          <div id="dinamic" className="flex flex-col gap-5 w-full">
            {trimestres.map((trimestre, index) => (
              <InputTrimestre
                key={index}
                total={index + 1}
                eliminar={() => eliminarTrimestre(index)}
                onChange={(field, value) =>
                  handleTrimestreChange(index, field, value)
                }
                trimestre={trimestre}
              />
            ))}
          </div>
          <div className="flex flex-row w-full justify-center gap-6">
            <Button
              onClick={agregarTrimestre}
              id="agregar"
              className="max-w-[300px] w-full"
            >
              Agregar
            </Button>

            <Button
              onClick={handleFormSubmit}
              id="Crear"
              className="max-w-[300px] w-full"
            >
              Crear
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CrearTrim;
