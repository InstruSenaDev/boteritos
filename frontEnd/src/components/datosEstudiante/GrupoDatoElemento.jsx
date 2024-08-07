import React, { useState } from "react";
import { DatoElemento } from "./DatoElemento";
import { InformativeModal } from "../modales/InformativeModal";
import { Input } from "../forms/Input";
import { Dropdown } from "../forms/Dropdown";
import { dataDoc } from "../../helper/objects/dropdownArray";
import { UploadFile } from "../forms/UploadFile";

export const GrupoDatoElemento = () => {
  const [cols, setCols] = useState(1);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [values, setValues] = useState({
    telefono: "",
    telefonodos: "",
    documento: "",
    responsable: "",
    condicionMedica: "",
    historiaClinica: "",
    informes: "",
    parentesco: "",
    nombre: "",
    ndocumento: "",
    direccion: "",
    empresa: "",
    lugaratención: "",
    rh: "",
    estatura: "",
    peso: "",
    diagnostico: "",
    restricciones: "",
    medicamentos: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDropdownChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleForm = (event) => {
    event.preventDefault();
    console.log(values);
  };

  const handleOpenModal = (contentType) => {
    setSelectedContent(contentType);
    switch (contentType) {
      case "Telefono":
        setCols(1);
        break;
      case "Responsable":
        setCols(2);
        break;
      case "CondicionMedica":
        setCols(1);
        break;
      case "HistoriaClinica":
        setCols(1);
        break;
      case "Informes":
        setCols(1);
        break;
      default:
        setCols(1);
    }
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedContent(null);
  };

  const getModalContent = () => {
    switch (selectedContent) {
      case "Telefono":
        return (
          <Input
            texto="Ingresa un numero de teléfono el cual permita comunicarse con el estudiante"
            placeholder="Por favor escriba su número telefónico"
            name="telefono"
            tipo="text"
            onChange={handleInputChange}
            value={values.telefono}
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
              value={values.nombre}
            />
            <Dropdown
              name={"documento"}
              label={"Tipo de documento"}
              data={dataDoc}
              onChange={(value) => handleDropdownChange("documento", value)}
              value={values.documento}
            />
            <Input
              texto="Número de documento"
              placeholder="Ingresa el número documento"
              name="ndocumento"
              tipo="text"
              onChange={handleInputChange}
              value={values.ndocumento}
            />
            <Input
              texto="Teléfono"
              placeholder="Ingresa el número de teléfono"
              name="telefono"
              tipo="text"
              onChange={handleInputChange}
              value={values.telefono}
            />
            <Input
              texto="Otro teléfono"
              placeholder="Ingresa un segundo teléfono"
              name="telefonodos"
              tipo="text"
              onChange={handleInputChange}
              value={values.telefonodos}
            />
            <Input
              texto="Dirección"
              placeholder="Ingresa la dirección"
              name="direccion"
              tipo="text"
              onChange={handleInputChange}
              value={values.direccion}
            />
            <Input
              texto="Empresa"
              placeholder="Ingresa la empresa"
              name="empresa"
              tipo="text"
              onChange={handleInputChange}
              value={values.empresa}
            />
            <Dropdown
              name={"parentesco"}
              label={"Tipo de parentesco"}
              data={dataDoc}
              onChange={(value) => handleDropdownChange("parentesco", value)}
              value={values.parentesco}
            />
            <button type="submit">Enviar</button>
          </>
        );
      case "Condicion Medica":
        return (
          <form onSubmit={handleForm}>
            <Dropdown
              name={"parentesco"}
              label={"Tipo de parentesco"}
              data={dataDoc}
              onChange={(value) => handleDropdownChange("parentesco", value)}
              value={values.parentesco}
            />
            <Input
              texto="Lugar de atención"
              placeholder="Ingresa el lugar de atención"
              name="lugaratención"
              tipo="text"
              onChange={handleInputChange}
              value={values.lugaratención}
            />
            <Dropdown
              name={"rh"}
              label={"RH"}
              data={dataDoc}
              onChange={(value) => handleDropdownChange("rh", value)}
              value={values.rh}
            />
            <Input
              texto="Estatura"
              placeholder="Ingresa la estatura"
              name="estatura"
              tipo="text"
              onChange={handleInputChange}
              value={values.estatura}
            />
            <Input
              texto="Peso"
              placeholder="Ingresa el peso"
              name="peso"
              tipo="text"
              onChange={handleInputChange}
              value={values.peso}
            />
            <button type="submit">Enviar</button>
          </form>
        );
      case "Historia Clinica":
        return (
          <>
            <Input
              texto="Diagnostico"
              placeholder="Ingresa el diagnostico del estudiante"
              name="diagnostico"
              tipo="text"
              onChange={handleInputChange}
              value={values.diagnostico}
            />
            <Input
              texto="Restricciones alimenticias"
              placeholder="Ingresa las restricciones alimenticias"
              name="restricciones"
              tipo="text"
              onChange={handleInputChange}
              value={values.restricciones}
            />
            <Input
              texto="Medicamentos"
              placeholder="Ingresa los medicamentos que necesita"
              name="medicamentos"
              tipo="text"
              onChange={handleInputChange}
              value={values.medicamentos}
            />
            <UploadFile />
          </>
        );
      case "Informes":
        return (
          <>
            <p>Información de Informes</p>
            <Input
              texto="Detalles del informe"
              placeholder="Ingresa los detalles del informe"
              name="informes"
              tipo="text"
              onChange={handleInputChange}
              value={values.informes}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-y-3 justify-between">
        <DatoElemento
          icon={"fa-solid fa-phone"}
          texto={"Telefono(s)"}
          onClick={() => handleOpenModal("Telefono")}
        />
        <DatoElemento
          icon={"fa-solid fa-user-group"}
          texto={"Responsable(s)"}
          onClick={() => handleOpenModal("Responsable")}
        />
        <DatoElemento
          icon={"fa-solid fa-hospital"}
          texto={"Condicion medica"}
          onClick={() => handleOpenModal("Condicion Medica")}
        />
        <DatoElemento
          icon={"fa-solid fa-address-card"}
          texto={"Historia clinica"}
          onClick={() => handleOpenModal("Historia Clinica")}
        />
        <DatoElemento
          icon={"fa-solid fa-user"}
          texto={"Informes"}
          onClick={() => handleOpenModal("Informes")}
        />
      </div>
      <InformativeModal
        txtmodal={`Información de ${selectedContent}`}
        cols={cols}
        isOpen={isOpen}
        onClose={handleCloseModal}
      >
        {getModalContent()}
      </InformativeModal>
    </>
  );
};
