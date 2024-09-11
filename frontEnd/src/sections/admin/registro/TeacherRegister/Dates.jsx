import React, { useEffect, useState } from "react";
import { DatePicker2 } from "../../../../components/forms/DatePicker.jsx";
import { Boton } from "../../../../components/forms/Boton.jsx";
import { postUserStudent } from "../../../../api/post.js";
import { getDate } from "../../../../helper/functions/getDate.js";
import { format } from "date-fns";
import { validateField } from "../../../../helper/validators/register.js";
import { useNavigate, Link } from "react-router-dom";
import { useRegFormContext } from "../../../../hooks/RegFormProvider.jsx";
import { caseProfesor } from "../../../../helper/validators/case/profesor.js";

export const DatesSection = () => {
  const [state, dispatch] = useRegFormContext();

  useEffect(() => {
    dispatch({ type: 'CHANGE_PERCENT', data: 60 })
  }, [])

  const navigate = useNavigate();

  const [errors, setErrors] = useState({}); // Estado para los errores

  const [isRegistering, setIsRegistering] = useState(false);

  const [values, setValues] = useState({
    fechaingreso: "",
    fechanacimiento: "",
    //hojaDeVida: null,
  });

  // Maneja el envío del formulario
  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'SET_DATE_TEACHER_DATA', data: values })

    // Validar todos los campos antes de enviar
    const newErrors = {};
    for (const key in values) {
        if (Object.hasOwn(values, key)) {
            const error = caseProfesor(key, values[key]);
            if (error) {
                newErrors[key] = error;
            }
        }
    }

    if (Object.keys(newErrors).length > 0) {
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
    navigate('/admin/registro/registroprofesor/datosmedicos');

    // createUser(dataUser);
  };
  // Maneja cambios en los inputs de texto
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const error = caseProfesor(name, value); // Validar el campo específico

    setErrors({
      ...errors,
      [name]: error,
    }); // Actualizar el estado de errores y valores

    setValues({
      ...values,
      [name]: value,
    });
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

    // const newErrors = {}; // Definir newErrors como un objeto vacío antes de usarlo
    // Object.entries(dataError).forEach(([key, value]) => {
    //   newErrors[key] = value[0];
    // });

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    // }
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

        <div className="w-full flex flex-col gap-y-5 xl:gap-y-0 xl:flex-row justify-between">
          {/* Botón para confirmar el formulario */}
          <Link to={"/admin/registro/registroprofesor/direcciones"} className="max-w-[400px] w-full">
            <Boton text="Atras" type="blue" />
          </Link>
          <Boton text="Confirmar" type="blue" />

        </div>
      </form>
    </>
  );
};

