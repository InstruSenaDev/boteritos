import { useEffect, useState } from "react";
import { Input } from "../../../../components/forms/Input.jsx";
import { Boton } from "../../../../components/forms/Boton.jsx";
import { validateField } from "../../../../helper/validators/register.js";
import { useRegFormContext } from "../../../../hooks/RegFormProvider.jsx";
import { useNavigate, Link } from "react-router-dom";
import { caseCondicionMedica } from "../../../../helper/validators/case/condicionMedica.js";
import { Dropdown } from "../../../../components/forms/Dropdown.jsx";
import { dataEps, dataRh } from "../../../../helper/objects/dropdownArray.js";

export const MedicalInfoSection = () => {
  const [state, dispatch] = useRegFormContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // Estado para los errores
  const [dataDropdown, setDataDropdown] = useState({
    dropdownEps: [],
    dropdownRh: [],
  });

  const [values, setValues] = useState({
    lugaratencion: "",
    peso: "",
    ideps: "",
    idrh: "",
    altura: "",
  });

  const dataFormInd = new FormData();

  useEffect(() => {
    dispatch({ type: "CHANGE_PERCENT", data: 83 });
  }, []);

  //PASAR DATOS A LOS DROPDOWNS (DATOS DE LA DB)
  useEffect(() => {
    const getDataDropdown = async () => {
      const resultEps = await dataEps();
      const resultRh = await dataRh();

      setDataDropdown({
        ...dataDropdown,
        dropdownEps: resultEps,
        dropdownRh: resultRh,
      });
    };

    getDataDropdown();
  }, []);

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

  // Función genérica para manejar cambios en otros dropdowns
  const handleDropdownChange = (name, value) => {
    setValues({ ...values, [name]: value });
    console.log("dropdowns value:", value); // Mostrar el valor seleccionado de los otros dropdowns en la consola
  };

  // Maneja el envío del formulario
  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "SET_MEDICAL_STUDENT_DATA", data: values });

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
      altura: values.altura.trim(),
    };

    //Recorrido del objeto para añadirlo al formData
    for (const key in dataUser) {
      if (Object.hasOwn(values, key)) {
        dataFormInd.set(key, dataUser[key]);
      }
    }

    dispatch({ type: "ADD_DATA_FORM", data: dataFormInd });
    navigate("/admin/registro/registroestudiante/telefonos");
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
            name={"altura"}
            texto={"Estatura"}
            placeholder={"Estatura del usuario"}
            tipo={"number"}
            onChange={handleInputChange}
            value={values.altura}
            error={errors.altura}
          />
          <Dropdown
            name={"idrh"}
            label={"Tipo de sangre"}
            data={dataDropdown.dropdownRh}
            onChange={(value) => handleDropdownChange("idrh", value)}
            placeholder={"Selecciona el tipo de sangre"}
            error={errors.idrh}
          />
          <Dropdown
            name={"ideps"}
            label={"Tipo de Eps"}
            //data={dataMatricula}
            data={dataDropdown.dropdownEps}
            onChange={(value) => handleDropdownChange("ideps", value)}
            placeholder={"Selecciona el tipo de eps"}
            error={errors.ideps}
          />
        </div>
        <div className="w-full flex flex-col gap-y-5 xl:gap-y-0 xl:flex-row justify-between">
          {/* Botón para confirmar el formulario */}
          <Link
            to={"/admin/registro/registroestudiante/fechas"}
            className="max-w-[400px] w-full"
          >
            <Boton text="Atras" type="blue" />
          </Link>
          <Boton text="Confirmar" type="blue" />
        </div>
      </form>
    </>
  );
};
