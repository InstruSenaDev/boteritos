import { Button } from "@tremor/react";
import React, { useEffect, useState } from "react";
import InputTrimestre from "../forms/InputTrimestre";

const CrearTrim = ({ onTrimestresCompletos }) => {
  const [trimestres, setTrimestres] = useState([{ id: 1, inicio: "", fin: "" }]);
  const [mensajeError, setMensajeError] = useState("");

  const agregarTrimestre = () => {
    if (trimestres.length >= 4) {
      setMensajeError("No puedes crear más de 4 trimestres");
      return;
    }

    setMensajeError("");
    const nuevosTrimestres = [...trimestres, { id: trimestres.length + 1, inicio: "", fin: "" }];
    setTrimestres(nuevosTrimestres);
  };

  const eliminarTrimestre = (index) => {
    if (trimestres.length <= 1) {
      setMensajeError("Debe haber al menos 1 trimestre");
      return;
    }
    setMensajeError("");
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
    
    const hasEmptyFields = trimestres.some(({ inicio, fin }) => !inicio || !fin);

    if (hasEmptyFields) {
      setMensajeError("Todos los trimestres deben tener fechas de inicio y fin.");
      return;
    }

    setMensajeError("");

    const trimestresValidos = trimestres.filter(({ inicio, fin }) => {
      const inicioDate = new Date(inicio);
      const finDate = new Date(fin);
      return inicioDate <= finDate;
    });

    if (trimestresValidos.length === trimestres.length) {
      localStorage.setItem("trimestres", JSON.stringify(trimestresValidos));
      console.log("Trimestres en el localStorage:", trimestresValidos);
      if (trimestresValidos.length >= 3) {
        onTrimestresCompletos();  // Llamar a esta función solo al hacer clic en "Crear"
      }
    } else {
      setMensajeError("Hay trimestres con fechas inválidas.");
    }
  };

  useEffect(() => {
    const trimestresGuardados = JSON.parse(localStorage.getItem("trimestres")) || [];
    setTrimestres(trimestresGuardados.length > 0 ? trimestresGuardados : [{ id: 1, inicio: "", fin: "" }]);
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-full">
      <main className="bg-white rounded-xl py-7 px-8 w-fit h-full space-y-5">
        <div className="w-full text-center">
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
              disabled={trimestres.length >= 4}
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
