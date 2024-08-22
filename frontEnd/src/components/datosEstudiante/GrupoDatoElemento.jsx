// src/components/GrupoDatoElemento.js

import React, { useState } from "react";
import { DatoElemento } from "./DatoElemento"; 
import { RegisterModal } from "../modales/RegisterModal"; 
import { ModalContent } from "../modales/ModalContent";
import { getModalConfig } from "../modales/getModalConfig";


export const GrupoDatoElemento = () => {
  const [cols, setCols] = useState(1);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [values, setValues] = useState({});


  
  // Maneja cambios en campos de texto
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Maneja cambios en dropdowns
  const handleDropdownChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleForm = (event) => {
    event.preventDefault();
    console.log(values); // Imprime los valores del formulario
    setValues({});
   
    setIsConfirm(true);
  };
  
  console.log(isConfirm);
  

  // Abre el modal con valores iniciales según el tipo de contenido
  const handleOpenModal = (contentType) => {
    const { initialValues, columns } = getModalConfig(contentType);

    setValues(initialValues); // Configura los valores iniciales del formulario

    setCols(columns);

    setSelectedContent(contentType);

    setIsOpen(true);
    
    setIsConfirm(false);// Reinicia el estado de confirmación al cerrar el modal
  };

  // Cierra el modal y resetea el contenido seleccionado
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedContent(null);
    setIsConfirm(false); // Reinicia el estado de confirmación al cerrar el modal
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
      <RegisterModal
        txtmodal={`Información de ${selectedContent}`} 
        cols={cols} 
        isOpen={isOpen}
        onClose={handleCloseModal}
        values={values}
        onSubmit={handleForm}
        isConfirm={isConfirm}
      >
        <ModalContent
          selectedContent={selectedContent}
          values={values}
          handleInputChange={handleInputChange}
          handleDropdownChange={handleDropdownChange}
        />

      </RegisterModal>
    </>
  );
};
