import React, { useEffect, useState } from "react";
import { DatePicker2 } from "../../../components/forms/DatePicker.jsx";
import { Boton } from "../../../components/forms/Boton.jsx";
import { postUserStudent } from "../../../api/post.js";
import { getDate } from "../../../helper/functions/getDate.js";
import { format } from "date-fns";
import { validateField } from "../../../helper/validators/register.js";

import { Link } from "react-router-dom";

export const DatesSection = () => {
  const [errors, setErrors] = useState({}); // Estado para los errores

  const [isRegistering, setIsRegistering] = useState(false);

  const [values, setValues] = useState({
    fechaingreso: "2000-01-01",
    fechanacimiento: "",
    //hojaDeVida: null,
  });

  // Maneja el envío del formulario
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newErrors = {}; // Definir newErrors como un objeto vacío antes de usarlo
    for (const key in values) {
      if (Object.hasOwn(values, key)) {
        const error = validateField(key, values[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      // Si hay errores, no enviar el formulario
      setErrors(newErrors);
      return;
    }

    const dataUser = {
      ...values,
      fechaingreso: values.fechaingreso
        ? format(new Date(values.fechaingreso), "yyyy-MM-dd")
        : null,
      fechanacimiento: values.fechanacimiento
        ? format(new Date(values.fechanacimiento), "yyyy-MM-dd")
        : null,
      fecharegistro: getDate(),
    };
    console.log(dataUser);

    //let formData = new FormData();

    /*Object.entries(dataUser).forEach(([key, value]) => {
      formData.append([key] , value)
      
    });

    console.log(formData);*/

    createUser(dataUser);
  };

  const createUser = async (data) => {
    const response = await postUserStudent(data, "usuarios");
    console.log(response);

    if (response.status == 200 || response.status == 201) {
      setIsRegistering(true);
      console.log(
        "Nada de errores, aqui se debe redireccionar al registro con detalle"
      );
      return;
    }

    //Se presentaron errores (API):
    const dataError = await response.data.error;

    const newErrors = {}; // Definir newErrors como un objeto vacío antes de usarlo
    Object.entries(dataError).forEach(([key, value]) => {
      newErrors[key] = value[0];
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }
  };

  return (
    <>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col max-w-[830px] w-full gap-x-[30px] gap-y-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-8">
            <DatePicker2
              name={"fechanacimiento"}
              texto={"Fecha de nacimiento"}
              value={values.fechanacimiento}
              onChange={handleInputChange}
              error={errors.fechanacimiento}
            />
              <DatePicker2
                name={"fechaingreso"}
                texto={"Fecha de ingreso"}
                value={values.fechaingreso}
                onChange={handleInputChange}
                error={errors.fechaingreso}
              />
          </div>

          <div className="w-full flex justify-center">
            {/* Botón para confirmar el formulario */}
            <Boton text="Confirmar" type="blue" />
          </div>
        </form>
    </>
  );
};

