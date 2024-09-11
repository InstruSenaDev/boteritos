import React, { useEffect, useState } from "react";
import { Input } from "../../../../components/forms/Input.jsx";
import { Boton } from "../../../../components/forms/Boton.jsx";
import { postUserStudent } from "../../../../api/post.js";
import { validateField } from "../../../../helper/validators/register.js";
import { useRegFormContext } from "../../../../hooks/RegFormProvider.jsx";
import { useNavigate, Link } from "react-router-dom";
import { caseCondicionMedica } from "../../../../helper/validators/case/condicionMedica.js";

export const MedicalInfoSection = () => {
  const [state, dispatch] = useRegFormContext();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'CHANGE_PERCENT', data: 83 })
  }, [])

  const [errors, setErrors] = useState({}); // Estado para los errores

  const [isRegistering, setIsRegistering] = useState(false);

  const [values, setValues] = useState({
    lugaratencion: "",
    peso: "",
    estatura: "",
    //hojaDeVida: null,
  });

  // Maneja cambios en los inputs de texto
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const error = caseCondicionMedica(name, value); // Validar el campo específico

    setErrors({
      ...errors,
      [name]: error,
    }); // Actualizar el estado de errores y valores

    setValues({
      ...values,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'SET_MEDICAL_DATA', data: values })

    // Validar todos los campos antes de enviar
    const newErrors = {};
    for (const key in values) {
        if (Object.hasOwn(values, key)) {
            const error = caseCondicionMedica(key, values[key]);
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
      lugaratencion: values.lugaratencion.trim(),
      peso: values.peso.trim(),
      estatura: values.estatura.trim(),
    };
    console.log(dataUser);


    //let formData = new FormData();

    /*Object.entries(dataUser).forEach(([key, value]) => {
      formData.append([key] , value)
      
    });

    console.log(formData);*/

    navigate('/admin/registro/registroadmin/telefonos')

    // createUser(dataUser);
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
          <Input
            name={"lugaratencion"}
            texto={"Lugar de atención"}
            placeholder={"Lugar de atención del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.lugaratencion}
            error={errors.lugaratencion}
          />
          <Input
            name={"peso"}
            texto={"Peso"}
            placeholder={"Peso del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.peso}
            error={errors.peso}
          />
          <Input
            name={"estatura"}
            texto={"Estatura"}
            placeholder={"Estatura del usuario"}
            tipo={"number"}
            onChange={handleInputChange}
            value={values.estatura}
            error={errors.estatura}
          />
        </div>
        <div className="w-full flex flex-col gap-y-5 xl:gap-y-0 xl:flex-row justify-between">
          {/* Botón para confirmar el formulario */}
          <Link to={"/admin/registro/registroadmin/fechas"} className="max-w-[400px] w-full">
            <Boton text="Atras" type="blue" />
          </Link>
          <Boton text="Siguiente" type="blue" />

        </div>
      </form>
    </>
  );
};
