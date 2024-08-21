import React, { useState } from "react";
import { Dropdown } from "../../components/forms/Dropdown.jsx";
import { Input } from "../../components/forms/Input.jsx";
import { UploadFile } from "../../components/forms/UploadFile.jsx";
import { DatePicker2 } from "../../components/forms/DatePicker.jsx";
import {
  dataDoc,
  dataRol,
  dataSexo,
  dataMatricula,
  dataArea,
} from "../../helper/objects/dropdownArray.js";
import { Boton } from "../../components/forms/Boton.jsx";
import { postUserStudent } from "../../api/post.js";
import { getDate } from "../../helper/functions/getDate.js";
import { format } from "date-fns";
import { validateField } from "../../helper/validators/register.js";

export const Registro = () => {
  const [values, setValues] = useState({
    matricula: "N/A",
    nombre: "",
    apellido: "",
    numerodocumento: "",
    comuna: "",
    barrio: "",
    correo: "",
    urlimg: "",
    fechaingreso: "2000-01-01",
    fechanacimiento: "",
    edad: "",
    institutoprocedencia: "N/A",
    direccion: "",
    idtipodocumento: "",
    idsexo: "",
    contrasena: "",
    cambiocontrasena: "0",
    estado: "1",
    idrol: "",
    idarea: "N/A",
    //hojaDeVida: null,
  });

  const [errors, setErrors] = useState({}); // Estado para los errores

  const [selectedRole, setSelectedRole] = useState("");

  // Maneja cambios en los inputs de texto
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const error = validateField(values.idrol, name, value); // Validar el campo específico

    setErrors({
      ...errors,
      [name]: error,
    }); // Actualizar el estado de errores y valores

    setValues({
      ...values,
      [name]: value,
    });
  };

  // Maneja cambios en el dropdown de rol
  const handleRoleChange = (value) => {
    setSelectedRole(value);
    setValues({ ...values, idrol: value }); // Actualiza el estado de 'rol'
    console.log("rol value:", value); // Mostrar el valor seleccionado del rol en la consola
  };

  // Función genérica para manejar cambios en otros dropdowns
  const handleDropdownChange = (name, value) => {
    setValues({ ...values, [name]: value });
    console.log("dropdowns value:", value); // Mostrar el valor seleccionado de los otros dropdowns en la consola
  };

  // Maneja cambios en los archivos cargados
  const handleFileChange = (name, file) => {
    setValues({ ...values, [name]: file });
    console.log(`${name} file:`, file); // Mostrar el archivo seleccionado en la consola
  };

  // Maneja el envío del formulario
  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log(values);

    const newErrors = {}; // Definir newErrors como un objeto vacío antes de usarlo
    for (const key in values) {
      if (Object.hasOwn(values, key)) {
        const error = validateField(values.idrol, key, values[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    }

    console.log(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Si hay errores, no enviar el formulario
      setErrors(newErrors);
      return;
    }

    const dataUser = {
      ...values,
      nombre: `${values.nombre.trim()} ${values.apellido.trim()}`,
      numerodocumento: values.numerodocumento.trim(),
      comuna: values.comuna.trim(),
      barrio: values.barrio.trim(),
      correo: values.correo.trim(),
      urlimg: `https://${values.urlimg}img.com`,
      edad: values.edad.trim(),
      institutoprocedencia: values.institutoprocedencia.trim(),
      direccion: values.direccion.trim(),
      contrasena: values.numerodocumento.trim(),
      fechaingreso: values.fechaingreso
        ? format(new Date(values.fechaingreso), "yyyy-MM-dd")
        : null,
      fechanacimiento: values.fechanacimiento
        ? format(new Date(values.fechanacimiento), "yyyy-MM-dd")
        : null,
      fecharegistro: getDate(),
    };
    console.log(dataUser);
    createUser(dataUser);
  };

  const createUser = async (data) => {
    const response = await postUserStudent(data, "usuarios");
    console.log(response);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col max-w-[830px] w-full gap-x-[30px] gap-y-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-8">
        {/* Dropdown para seleccionar el rol */}
        <Dropdown
          name={"idrol"}
          label={"¿Qué deseas crear?"}
          data={dataRol}
          onChange={handleRoleChange}
          placeholder={"Selecciona un rol"}
          error={errors.idrol}
        />
        {/* Renderiza dropdowns adicionales según el rol seleccionado */}
        {selectedRole == "2" ? (
          <Dropdown
            name={"idarea"}
            label={"Area"}
            data={dataArea}
            onChange={(value) => handleDropdownChange("idarea", value)}
            placeholder={"Selecciona un area"}
            error={errors.idarea}
          />
        ) : selectedRole == "3" ? (
          <Dropdown
            name={"matricula"}
            label={"Tipo de matrícula"}
            data={dataMatricula}
            onChange={(value) => handleDropdownChange("matricula", value)}
            placeholder={"Selecciona el tipo de matricula"}
            error={errors.matricula}
          />
        ) : null}

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
          data={dataDoc}
          onChange={(value) => handleDropdownChange("idtipodocumento", value)}
          placeholder={"Selecciona el tipo de documento"}
          error={errors.idtipodocumento}
        />
        <Input
          name={"numerodocumento"}
          texto={"Número de documento"}
          placeholder={"Documento del usuario"}
          tipo={"number"}
          onChange={handleInputChange}
          value={values.numerodocumento}
          error={errors.numerodocumento}
        />
        <DatePicker2
          name={"fechanacimiento"}
          texto={"Fecha de nacimiento"}
          value={values.fechanacimiento}
          onChange={handleInputChange}
          error={errors.fechanacimiento}
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
        {selectedRole != 1 ? (
          <DatePicker2
            name={"fechaingreso"}
            texto={"Fecha de ingreso"}
            value={values.fechaingreso}
            onChange={handleInputChange}
            error={errors.fechaingreso}
          />
        ) : null}
        <Input
          name={"barrio"}
          texto={"Barrio"}
          placeholder={"Barrio del usuario"}
          tipo={"text"}
          onChange={handleInputChange}
          value={values.barrio}
          error={errors.barrio}
        />
        <Input
          name={"direccion"}
          texto={"Dirección"}
          placeholder={"Dirección del usuario"}
          tipo={"text"}
          onChange={handleInputChange}
          value={values.direccion}
          error={errors.direccion}
        />
        <Input
          name={"comuna"}
          texto={"Comuna"}
          placeholder={"Comuna del usuario"}
          tipo={"number"}
          onChange={handleInputChange}
          value={values.comuna}
          error={errors.comuna}
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
          data={dataSexo}
          onChange={(value) => handleDropdownChange("idsexo", value)}
          placeholder={"Selecciona el sexo"}
          error={errors.idsexo}
        />

        {/* Renderización condicional del campo "instituto" o "UploadFile" según el rol */}
        {selectedRole !== "1" && selectedRole !== "2" ? (
          <Input
            name={"institutoprocedencia"}
            texto={"Instituto"}
            placeholder={"Instituto del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.instituto}
            error={errors.institutoprocedencia}
          />
        ) : (
          <UploadFile
            title={"Hoja de vida"}
            id="hojaDeVida"
            onFileChange={(file) => handleFileChange("hojaDeVida", file)}
          />
        )}
        <UploadFile
          title={"Foto"}
          id="foto"
          onFileChange={(file) => handleFileChange("foto", file)}
        />
      </div>

      <div className="w-full flex justify-center">
        {/* Botón para confirmar el formulario */}
        <Boton text="Confirmar" type="blue" />
      </div>
    </form>
  );
};
