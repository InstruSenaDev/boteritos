import React, { useEffect, useState } from "react";
import { Input } from "../../../components/forms/Input.jsx";
import { Boton } from "../../../components/forms/Boton.jsx";
import { postUserStudent } from "../../../api/post.js";
import { validateField } from "../../../helper/validators/register.js";
import { useRegFormContext } from "../../../hooks/RegFormProvider.jsx";
import { useNavigate, Link } from "react-router-dom";

export const AdressSection = () => {
  const [state, dispatch] = useRegFormContext();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'CHANGE_PERCENT', data: 50 })
  }, [])

  const [errors, setErrors] = useState({}); // Estado para los errores

  const [isRegistering, setIsRegistering] = useState(false);

  const [values, setValues] = useState({
    comuna: "",
    barrio: "",
    numero: "",
    //hojaDeVida: null,
  });

  // Maneja cambios en los inputs de texto
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const error = validateField(name, value); // Validar el campo específico

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
    dispatch({ type: 'SET_ADDRESS_DATA', data: values })

    // const newErrors = {}; // Definir newErrors como un objeto vacío antes de usarlo
    // for (const key in values) {
    //   if (Object.hasOwn(values, key)) {
    //     const error = validateField(key, values[key]);
    //     if (error) {
    //       newErrors[key] = error;
    //     }
    //   }
    // }

    // if (Object.keys(newErrors).length > 0) {
    //   // Si hay errores, no enviar el formulario
    //   setErrors(newErrors);
    //   return;
    // }

    const dataUser = {
      ...values,
      comuna: values.comuna.trim(),
      barrio: values.barrio.trim(),
      numero: values.numero.trim(),
    };
    console.log(dataUser);


    //let formData = new FormData();

    /*Object.entries(dataUser).forEach(([key, value]) => {
      formData.append([key] , value)
      
    });

    console.log(formData);*/
    navigate('/admin/registro/registroadmin/fechas')

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
            name={"barrio"}
            texto={"Barrio"}
            placeholder={"Barrio del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.barrio}
          //error={errors.barrio}
          />
          <Input
            name={"numero"}
            texto={"Dirección"}
            placeholder={"Dirección del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.numero}
          //error={errors.numero}
          />
          <Input
            name={"comuna"}
            texto={"Comuna"}
            placeholder={"Comuna del usuario"}
            tipo={"number"}
            onChange={handleInputChange}
            value={values.comuna}
          //error={errors.comuna}
          />
        </div>
        <div className="w-full flex flex-col gap-y-5 xl:gap-y-0 xl:flex-row justify-between">
          {/* Botón para confirmar el formulario */}
          <Link to={"/admin/registro/registroadmin"} className="max-w-[400px] w-full">
            <Boton text="Atras" type="blue" />
          </Link>
          <Boton text="Siguiente" type="blue" />

        </div>
      </form>
    </>
  );
};
