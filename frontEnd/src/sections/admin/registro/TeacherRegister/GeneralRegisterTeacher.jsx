import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Dropdown } from "../../../../components/forms/Dropdown.jsx";
import { Input } from "../../../../components/forms/Input.jsx";
import { UploadFile } from "../../../../components/forms/UploadFile.jsx";
import { dataDoc, dataSexo } from "../../../../helper/objects/dropdownArray.js";
import { Boton } from "../../../../components/forms/Boton.jsx";
import { validateField } from "../../../../helper/validators/register.js";
import { useRegFormContext } from "../../../../hooks/RegFormProvider.jsx";
import { caseProfesor } from "../../../../helper/validators/case/profesor.js";

export const GeneralRegisterTeacher = () => {
  const navigate = useNavigate();
  const prueba = new FormData();
  const [state, dispatch] = useRegFormContext();
  const [errors, setErrors] = useState({}); // Estado para los errores
  const [dataDropdown, setDataDropdown] = useState({
    dropdownDocumento: [],
    dropdownSexo: [],
  });
  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    idtipodocumento: "",
    documento: "",
    edad: "",
    correo: "",
    idsexo: "",
    contrasena: "",
    cambiocontrasena: "0",
    estado: "1",
    idrol: 2,
  });
  const dataFormInd = new FormData();

  //PASAR DATOS A LOS DROPDOWNS (DATOS DE LA DB)
  useEffect(() => {
    const getDataDropdown = async () => {
      const resultSexo = await dataSexo();
      const resultDocumento = await dataDoc();

      setDataDropdown({
        ...dataDropdown,
        dropdownSexo: resultSexo,
        dropdownDocumento: resultDocumento,
      });
    };

    getDataDropdown();
  }, []);

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

  // Función genérica para manejar cambios en otros dropdowns
  const handleDropdownChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  // Handle file changes
  const handleFileChange = (name, file) => {
    dataFormInd.set(name, file);
    console.log(file);
  };

  // Maneja el envío del formulario
  const handleFormSubmit = (event) => {
    event.preventDefault();

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

    //Limpiamos los datos
    const dataUser = {
      ...values,
      nombre: values.nombre.trim(),
      apellido: values.apellido.trim(),
      documento: values.documento.trim(),
      correo: values.correo.trim(),
      edad: values.edad.trim(),
      contrasena: values.documento.trim(),
    };
    checkDoc(dataUser);
  };
    

    const checkDoc = async (value) => {
      const response = await fetch(
        `http://localhost:8000/api/v3/sql/checkdoc/${value.documento}`
      );
      const data = await response.json();
      
      console.log(data);
      
      if (data.error) {
        console.log(data.error);
        return;
      }
  
      //Recorrido del objeto para añadirlo al formData
      for (const key in value) {
        if (Object.hasOwn(values, key)) {
          dataFormInd.set(key, value[key]);
        }
      }
      dispatch({ type: "ADD_DATA_FORM", data: dataFormInd });
      navigate("/admin/registro/registroprofesor/direcciones");
    };


  

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col max-w-[830px] w-full gap-x-[30px] gap-y-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-8">
          {/* Renderiza dropdowns adicionales según el rol seleccionado */}
          <Input
            name={"nombre"}
            texto={"Nombre"}
            placeholder={"Nombre del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.nombre}
            error={errors.nombre}
          />
          <Input
            name={"apellido"}
            texto={"Apellidos"}
            placeholder={"Apellido del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.apellido}
            error={errors.apellido}
          />
          {/* Dropdown para seleccionar el tipo de documento */}
          <Dropdown
            name={"idtipodocumento"}
            label={"Tipo de documento"}
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("idtipodocumento", value)}
            placeholder={"Selecciona el tipo de documento"}
            error={errors.idtipodocumento}
          />
          <Input
            name={"documento"}
            texto={"Número de documento"}
            placeholder={"Documento del profesor"}
            tipo={"number"}
            onChange={handleInputChange}
            value={values.documento}
            error={errors.documento}
          />
          <Input
            name={"edad"}
            texto={"Edad"}
            placeholder={"Edad del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.edad}
            error={errors.edad}
          />
          <Input
            name={"correo"}
            texto={"Correo"}
            placeholder={"Correo electrónico del usuario"}
            tipo={"email"}
            onChange={handleInputChange}
            value={values.correo}
            error={errors.correo}
          />
          {/* Dropdown para seleccionar el sexo */}
          <Dropdown
            name={"idsexo"}
            label={"Sexo"}
            //data={dataMatricula}
            data={dataDropdown.dropdownSexo}
            onChange={(value) => handleDropdownChange("idsexo", value)}
            placeholder={"Selecciona el sexo"}
            error={errors.idsexo}
          />
          <UploadFile
          typefile={"image/*"}
            title={"Foto"}
            id="imagen"
            onFileChange={(file) => handleFileChange("imagen", file)}
          />
        </div>
        <div className="w-full flex flex-col gap-y-5 xl:gap-y-0 xl:flex-row justify-between">
          {/* Botón para confirmar el formulario */}
          <Link to={"/admin/registro"} className="max-w-[400px] w-full">
            <Boton text="Atras" type="blue" />
          </Link>
          <Boton text="Confirmar" type="blue" />
        </div>
      </form>
    </>
  );
};
