// src/components/GrupoDatoElemento.js
import React, { useState, useEffect } from "react";
import { DatoElemento } from "./DatoElemento";
import { RegisterModal } from "../modales/RegisterModal";
import { ModalContent } from "../modales/ModalContent";
import { getModalConfig } from "../../helper/modales/getModalConfig";
import { postModales } from "../../api/post";
import { defaultValues } from "../../helper/modales/objectsModal";
import { useParams } from "react-router-dom";

export const GrupoDatoElemento = () => {
  const [cols, setCols] = useState(1);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [values, setValues] = useState({});
  const { id } = useParams();

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

    // Recorrer y aplicar .trim() a cada valor del objeto
    const trimmedValues = Object.entries(values).reduce((acc, [key, value]) => {
      acc[key] = typeof value === "string" ? value.trim() : value;
      return acc;
    }, {});

    console.log("Valores después de aplicar .trim():", trimmedValues); // Imprime los valores del formulario

    // Verificar si hay algún valor vacío después de aplicar .trim()
    const hasEmptyFields = Object.values(trimmedValues).some(
      (value) => value === ""
    );

    if (hasEmptyFields) {
      console.error(
        "Error: Existen campos vacíos después de recortar los espacios en blanco."
      );
      return; // Detiene el proceso si se encuentran campos vacíos
    }

    // Si no hay campos vacíos, continuar con el proceso
    // setValues(trimmedValues);

    // Aquí puedes proceder con el envío de los datos
    setIsConfirm(true);
    console.log(isConfirm);
    console.log("Valores actualizados:", values);

    console.log("valores de trimmed", trimmedValues);
    fetchModal(trimmedValues);
  };

  const fetchModal = async (data) => {
    console.log("Datos que se enviarán a la API:", data);
    const response = await postModales(data, "responsable");
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

  

  // Abre el modal con valores iniciales según el tipo de contenido
  const handleOpenModal = (contentType) => {
    const { initialValues, columns } = getModalConfig(contentType);

    if (contentType === "responsable") {
      // Agrega el ID del estudiante al nuevo campo idusuario en responsable
      initialValues.idusuario = parseInt(id);
      
      console.log("ID usuario:", initialValues.idusuario);
    }

    setValues(initialValues); // Configura los valores iniciales del formulario

    setCols(columns);

    setSelectedContent(contentType);

    setIsOpen(true);

    setIsConfirm(false); // Reinicia el estado de confirmación al cerrar el modal
  };

  useEffect(() => {
    if (selectedContent) {
    }
  }, [values, selectedContent]);

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
          onClick={() => handleOpenModal("telefono")}
        />
        <DatoElemento
          icon={"fa-solid fa-user-group"}
          texto={"Responsable(s)"}
          onClick={() => handleOpenModal("responsable")}
        />
        <DatoElemento
          icon={"fa-solid fa-hospital"}
          texto={"Condicion medica"}
          onClick={() => handleOpenModal("condicionmedica")}
        />
        <DatoElemento
          icon={"fa-solid fa-address-card"}
          texto={"Historia clinica"}
          onClick={() => handleOpenModal("historiaclinica")}
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
        selectedContent={selectedContent}
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
