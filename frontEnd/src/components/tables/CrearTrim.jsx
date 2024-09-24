import { Button } from "@tremor/react";
import React, { useState } from "react";
import InputTrimestre from "../forms/InputTrimestre";
import { postTrimestres } from "../../api/post";
import { format } from "date-fns";
import { Input } from "../forms/Input";

const CrearTrim = ({ onTrimestresCompletos }) => {
  const [trimestres, setTrimestres] = useState([
    { id: 1, inicio: "", fin: "" },
  ]);
  const [descripcionGeneral, setDescripcionGeneral] = useState(""); // Estado para la descripción general
  const [mensajeError, setMensajeError] = useState("");

  const agregarTrimestre = () => {
    if (trimestres.length >= 4) {
      setMensajeError("No puedes crear más de 4 trimestres");
      return;
    }
    setMensajeError("");
    const nuevosTrimestres = [
      ...trimestres,
      { id: trimestres.length + 1, inicio: "", fin: "" },
    ];
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

  const handleDescripcionChange = (event) => {
    setDescripcionGeneral(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Verificar si la descripción general está vacía
    if (!descripcionGeneral) {
        setMensajeError("La descripción general es obligatoria.");
        return;
    }

    // Verificar si algún trimestre tiene campos vacíos de fechas
    const hasEmptyFields = trimestres.some(({ inicio, fin }) => !inicio || !fin);
    if (hasEmptyFields) {
        setMensajeError("Todos los trimestres deben tener fechas de inicio y fin.");
        return;
    }

    // Limpiar mensajes de error anteriores
    setMensajeError("");

    // Validar que las fechas de inicio sean anteriores o iguales a las de fin
    const trimestresValidos = trimestres.filter(({ inicio, fin }) => {
        const inicioDate = new Date(inicio);
        const finDate = new Date(fin);
        return inicioDate <= finDate;  // Solo mantener los trimestres válidos
    });

    if (trimestresValidos.length !== trimestres.length) {
        setMensajeError("Hay trimestres con fechas inválidas (la fecha de inicio debe ser anterior o igual a la de fin).");
        return;
    }

    // Si todas las validaciones se pasan, proceder con el envío
    try {
        const body = {
            descripcion: descripcionGeneral,
            trimestres: trimestresValidos.map((trimestre, index) => ({
                trimestre: index === 0 ? "I" : index === 1 ? "II" : index === 2 ? "III" : "IV",  // Asignación del trimestre
                fechainicio: format(new Date(trimestre.inicio), "yyyy-MM-dd"),  // Formato de fecha para la API
                fechafin: format(new Date(trimestre.fin), "yyyy-MM-dd"),
            })),
        };

        // Realizar el POST al backend
        const response = await postTrimestres(body, "trimestre/");
        console.log("Respuesta del servidor:", response);

        if (response && response.success) {
            onTrimestresCompletos();  // Acción si los trimestres se guardan correctamente
        } else {
            setMensajeError("Error al guardar los trimestres.");
        }
    } catch (error) {
        console.error("Error al hacer POST de los trimestres:", error);
        setMensajeError("Error de conexión. Inténtalo más tarde.");
    }
};

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
          {/* Input para la descripción general */}
          <div className="w-full flex justify-center">
            <Input
              texto="Descripción general"
              placeholder="Ingresa una descripción general de los trimestres"
              name="descripcionGeneral"
              tipo="text"
              onChange={handleDescripcionChange}
              value={descripcionGeneral || ""}
            />
          </div>

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
