import React, { useEffect, useState } from "react";
import HeaderData from "../../../components/list/headerData/HeaderData";
import { useParams } from "react-router-dom";
import {
  dataDatosMedicosProfesor,
  DataDireccionesProfesor,
  dataContactosProfesor,
  DataPersonalProfesor,
} from "../../../api/get";
import { GrupoDatos } from "../../../components/list/groupData/GrupoDatos";
import { UpdateModal } from "../../../components/modales/UpdateModal";
import { ModalContentUpdate } from "../../../components/modales/ModalContentUpdate";
import { UpdateModalesValidators } from "../../../helper/validators/UpdateModalesValidators";
import { updateSectionData } from "./updateLogic";

export const DetailsTeachers = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null); //Para almacenar la sección actual que se está editando.
  const [sectionData, setSectionData] = useState(null); //para almacenar los datos de cada sección
  const dataFormInd = new FormData();
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  //almacenar los datos obtenidos del API para diferentes secciones.
  const [dataDetail, setDataDetail] = useState({
    direcciones: [],
    datosMedicos: [],
    contactos: [],
    personal: [],
  });

  //FUNCION PARA OBTENER LOS DATOS

  useEffect(() => {
    const obtainData = async () => {
      const dataDatosMedicos = await dataDatosMedicosProfesor(
        `datosmedicos/profesor/${id}`
      );

      const dataContactos = await dataContactosProfesor(
        `telefono/profesor/${id}`
      );

      const dataDirecciones = await DataDireccionesProfesor(
        `direccion/profesor/${id}`
      );

      const dataPersonalResponse = await DataPersonalProfesor(`profesor/${id}`);

      // Verifica si los datos son un objeto y conviértelo a un array si es necesario
      const personalData = Array.isArray(dataPersonalResponse.data.data)
        ? dataPersonalResponse.data.data
        : [dataPersonalResponse.data.data];

      if (!dataDatosMedicos.status == 200) {
        setDataDetail({ datosMedicos: null });
      }

      if (!dataContactos.status == 200) {
        setDataDetail({ contactos: null });
      }

      if (!dataDirecciones.status == 200) {
        setDataDetail({ direcciones: null });
      }

      if (dataPersonalResponse.status === 200) {
        setDataDetail((prevState) => ({
          ...prevState,
          personal: personalData,
        }));
      }

      console.log("Datos datos medicos:", dataDatosMedicos.data.data);
      console.log("Datos Contactos:", dataContactos.data.data);
      console.log("Datos direcciones:", dataDirecciones.data.data);
      console.log("Datos personales:", personalData);

      setDataDetail({
        ...dataDetail,
        direcciones: dataDirecciones.data.data,
        datosMedicos: dataDatosMedicos.data.data,
        contactos: dataContactos.data.data,
        personal: personalData,
      });
    };

    obtainData();
  }, []);

  //Update
  const update = (sectionId, index) => {
    let data;

    switch (sectionId) {
      case "Datos personales":
        data = dataDetail.personal[index];
        break;
      case "Datos Medicos":
        data = dataDetail.datosMedicos[index];
        break;
      case "Contactos":
        data = dataDetail.contactos[index];
        break;
      case "Dirección":
        data = dataDetail.direcciones[index];
        break;
      default:
        data = null;
    }

    console.log("Selected data:", data);
    setSelectedSection(sectionId);
    setSectionData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSection(null);
    setSectionData(null);
    setErrors({});
  };

  const handleInputChange = (e, key) => {
    const { name, value } = e.target;
    const content = selectedSection || "default"; // Sección actual

    // implementar tu lógica de validación
    const error = UpdateModalesValidators(content, name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error, // Almacena el error en el estado
    }));

    setSectionData((prevData) => ({
      ...prevData,
      [key]: value, // Actualiza el valor en la sección
    }));
  };

  const handleSave = async () => {
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      console.error("Errores presentes, no se puede guardar.");
      return;
    }

    const result = await updateSectionData(
      selectedSection,
      sectionData,
      id,
      dataFormInd
    );
    if (result.status === 201) {
      console.log("Datos guardados", result.data);
    } else {
      console.error("Error al guardar los datos", result.data);
    }

    closeModal();
  };

  const handleFileChange = (name, file) => {
    dataFormInd.set(name, file);
    console.log(file);
  };

  return (
    <div className="w-full space-y-2 grid gap-10">
      <HeaderData id={id} urlApi={"sql/profesor/header/"} typeLink={"back"} />

      {dataDetail.personal &&
        dataDetail.personal.map((value, index) => (
          <GrupoDatos
            titulo={"Datos personales"}
            update={() => update("Datos personales", index)}
            data={dataDetail.personal}
            key={index}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Nombres:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.nombre}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Apellidos:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.apellido}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Correo:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.correo}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Sexo:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.sexo}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Tipo documento:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.tipodocumento}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Documento:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.documento}
                </p>
              </div>

              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  edad:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.edad}
                </p>
              </div>

              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Título:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.titulo}
                </p>
              </div>

              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Área:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.area}
                </p>
              </div>

              <div className="break-words">
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Hoja de vida:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  <a
                    download="Archivo boterito"
                    href={value.hojavida}
                    className="font-cocogooseLight text-paragraph2 flex-1"
                  >
                    {value.hojavida}
                  </a>
                </p>
              </div>
            </div>
          </GrupoDatos>
        ))}

      <div className="space-y-7">
        {dataDetail.direcciones &&
          dataDetail.direcciones.map((value, index) => (
            <GrupoDatos
              titulo={"Dirección"}
              update={() => update("Dirección", index)}
              data={dataDetail.direcciones}
              key={index}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Comuna:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.comuna}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Número
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.numero}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Barrio:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.barrio}
                  </p>
                </div>
              </div>
            </GrupoDatos>
          ))}

        {dataDetail.datosMedicos &&
          dataDetail.datosMedicos.map((value, index) => (
            <GrupoDatos
              titulo={"Datos Medicos"}
              update={() => update("Datos Medicos", index)}
              data={dataDetail.datosMedicos}
              key={index}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Lugar de atención:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.lugaratencion}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Peso:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.peso}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Altura:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.altura}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    EPS:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.eps}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Tipo de sangre:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.rh}
                  </p>
                </div>
              </div>
            </GrupoDatos>
          ))}

        {dataDetail.contactos &&
          dataDetail.contactos.map((value, index) => (
            <GrupoDatos
              titulo={"Contactos"}
              update={() => update("Contactos", index)}
              data={dataDetail.contactos}
              key={index}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Telefono:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.telefono1}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Segundo Telefono
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.telefono2}
                  </p>
                </div>
              </div>
            </GrupoDatos>
          ))}
      </div>
      <UpdateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
      >
        <ModalContentUpdate
          section={selectedSection}
          data={sectionData}
          onChange={handleInputChange}
          handleFileChange={handleFileChange}
          errores={errors}
        />
      </UpdateModal>
    </div>
  );
};
