import React, { useEffect, useState } from "react";
import { Input } from "../forms/Input";
import { Dropdown } from "../forms/Dropdown";
import { UploadFile } from "../forms/UploadFile";
import { dataDoc } from "../../helper/objects/dropdownArray";

// Devuelve el contenido del modal según el tipo de contenido seleccionado
export const ModalContent = ({
  selectedContent,
  values,
  handleInputChange,
  handleDropdownChange,
}) => {

  const [errors, setErrors]=useState({})

  const [dataDropdown, setDataDropdown] = useState({
    dropdownDocumento: [],
  });


  useEffect(()=>{
    const getDataDropdown = async () =>{
      const resultDocumento = await dataDoc();

      setDataDropdown({
        ...dataDropdown,
        dropdownDocumento: resultDocumento
      });
    };
    
    getDataDropdown();
  }, []);


const handleFormSubmit = (event) =>{
  event.preventDefault();

  const dataTel={
    ...values,
    telefono: values.telefono.trim()

  };
  console.log(dataTel);
  
  createTel(dataTel);
}

const createTel = async (data) => {
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

  switch (selectedContent) {
    case "Telefono":
      return (
        <Input
          texto="Ingresa un número de teléfono el cual permita comunicarse con el estudiante"
          placeholder="Por favor escriba su número telefónico"
          name="telefono"
          tipo="text"
          onChange={handleInputChange}
          value={values.telefono || ""}
        />
      );
    
    case "Responsable":
      return (
        <>
          <Input
            texto="Nombre completo"
            placeholder="Ingresa el nombre completo"
            name="nombre"
            tipo="text"
            onChange={handleInputChange}
            value={values.nombre || ""}
          />
          <Dropdown
            name="documento"
            label="Tipo de documento"
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("documento", value)}
            value={values.documento || ""}
          />
          <Input
            texto="Número de documento"
            placeholder="Ingresa el número documento"
            name="ndocumento"
            tipo="text"
            onChange={handleInputChange}
            value={values.ndocumento || ""}
          />
          <Input
            texto="Teléfono"
            placeholder="Ingresa el número de teléfono"
            name="telefono"
            tipo="text"
            onChange={handleInputChange}
            value={values.telefono || ""}
          />
          <Input
            texto="Otro teléfono"
            placeholder="Ingresa un segundo teléfono"
            name="telefonodos"
            tipo="text"
            onChange={handleInputChange}
            value={values.telefonodos || ""}
          />
          <Input
            texto="Dirección"
            placeholder="Ingresa la dirección"
            name="direccion"
            tipo="text"
            onChange={handleInputChange}
            value={values.direccion || ""}
          />
          <Input
            texto="Empresa"
            placeholder="Ingresa la empresa"
            name="empresa"
            tipo="text"
            onChange={handleInputChange}
            value={values.empresa || ""}
          />
          <Dropdown
            name="parentesco"
            label="Tipo de parentesco"
            data={dataDoc}
            onChange={(value) => handleDropdownChange("parentesco", value)}
            value={values.parentesco || ""}
          />
        </>
      );
    case "Condicion Medica":
      return (
        <>
          <Dropdown
            name="parentesco"
            label="Tipo de parentesco"
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("parentesco", value)}
            value={values.parentesco || ""}
          />
          <Input
            texto="Lugar de atención"
            placeholder="Ingresa el lugar de atención"
            name="lugaratención"
            tipo="text"
            onChange={handleInputChange}
            value={values.lugaratención || ""}
          />
          <Dropdown
            name="rh"
            label="RH"
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("rh", value)}
            value={values.rh || ""}
          />
          <Input
            texto="Estatura"
            placeholder="Ingresa la estatura"
            name="estatura"
            tipo="text"
            onChange={handleInputChange}
            value={values.estatura || ""}
          />
          <Input
            texto="Peso"
            placeholder="Ingresa el peso"
            name="peso"
            tipo="text"
            onChange={handleInputChange}
            value={values.peso || ""}
          />
        </>
      );
    case "Historia Clinica":
      return (
        <>
          <Input
            texto="Diagnóstico"
            placeholder="Ingresa el diagnóstico del estudiante"
            name="diagnostico"
            tipo="text"
            onChange={handleInputChange}
            value={values.diagnostico || ""}
          />
          <Input
            texto="Restricciones alimenticias"
            placeholder="Ingresa las restricciones alimenticias"
            name="restricciones"
            tipo="text"
            onChange={handleInputChange}
            value={values.restricciones || ""}
          />
          <Input
            texto="Medicamentos"
            placeholder="Ingresa los medicamentos que necesita"
            name="medicamentos"
            tipo="text"
            onChange={handleInputChange}
            value={values.medicamentos || ""}
          />
          <UploadFile />
        </>
      );
    case "Informes":
      return (
        <div>
          <h2>Informes</h2>
          <p>Esto NO será un modal.</p>
        </div>
      );
    default:
      return null;
  }
};
