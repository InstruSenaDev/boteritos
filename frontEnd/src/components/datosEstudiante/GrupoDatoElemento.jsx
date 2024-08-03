import React, { useState } from 'react';
import { DatoElemento } from "./DatoElemento";
import { InformativeModal } from '../modales/InformativeModal';
import { Input } from '../forms/Input';

export const GrupoDatoElemento = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    telefono: '',
    documento: '',
    responsable: '',
    condicionMedica: '',
    historiaClinica: '',
    informes: ''
  });

  const handleOpenModal = (contentType) => {
    setSelectedContent(contentType);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedContent(null);
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const getModalContent = () => {
    switch (selectedContent) {
      case "Telefono":
        return (
          <>
          
            <Input
              texto="Número de documento"
              placeholder="Ingresa tu documento"
              name="telefono"
              tipo="text"
              onChange={handleInputChange}
              value={values.telefono}
            />
          </>
        );
      case "Responsable":
        return (
          <>
            <p>Información del Responsable</p>
            <Input
              texto="Nombre del responsable"
              placeholder="Ingresa el nombre del responsable"
              name="responsable"
              tipo="text"
              onChange={handleInputChange}
              value={values.responsable}
            />
          </>
        );
      case "CondicionMedica":
        return (
          <>
            <p>Información de la Condición Médica</p>
            <Input
              texto="Detalles de la condición"
              placeholder="Ingresa los detalles de la condición"
              name="condicionMedica"
              tipo="text"
              onChange={handleInputChange}
              value={values.condicionMedica}
            />
          </>
        );
      case "HistoriaClinica":
        return (
          <>
            <p>Información de la Historia Clínica</p>
            <Input
              texto="Detalles de la historia clínica"
              placeholder="Ingresa los detalles de la historia clínica"
              name="historiaClinica"
              tipo="text"
              onChange={handleInputChange}
              value={values.historiaClinica}
            />
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
        <DatoElemento icon={"fa-solid fa-phone"} texto={"Telefono(s)"} onClick={() => handleOpenModal("Telefono")} />
        <DatoElemento icon={"fa-solid fa-user-group"} texto={"Responsable(s)"} onClick={() => handleOpenModal("Responsable")} />
        <DatoElemento icon={"fa-solid fa-hospital"} texto={"Condicion medica"} onClick={() => handleOpenModal("CondicionMedica")} />
        <DatoElemento icon={"fa-solid fa-address-card"} texto={"Historia clinica"} onClick={() => handleOpenModal("HistoriaClinica")} />
        <DatoElemento icon={"fa-solid fa-user"} texto={"Informes"} onClick={() => handleOpenModal("Informes")} />
      </div>
      <InformativeModal
        txtmodal={`Información de ${selectedContent}`}
        cols={2}
        isOpen={isOpen}
        onClose={handleCloseModal}
      >
        {getModalContent()}
      </InformativeModal>
    </>
  );
}
