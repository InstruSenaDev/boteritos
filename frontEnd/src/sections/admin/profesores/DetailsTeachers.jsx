import React, { useEffect, useState } from 'react'
import HeaderData from '../../../components/list/headerData/HeaderData';
import { useParams } from 'react-router-dom';
import {
  dataDetailProfesores
} from "../../../api/get"
import { GrupoDatos } from '../../../components/list/groupData/GrupoDatos';
import { UpdateModal } from '../../../components/modales/UpdateModal';
import { ModalContentUpdate } from '../../../components/modales/ModalContentUpdate';


export const DetailsTeachers = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);//Para almacenar la sección actual que se está editando.
  const { id } = useParams();

  //almacenar los datos obtenidos del API para diferentes secciones.
  const [dataDetail, setDataDetail] = useState({
    direcciones: [],
   
  })

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSection(null);

    setErrors({});
  };

//FUNCION PARA OBTENER LOS DATOS

  useEffect(()=>{
    const obtainData = async()=>{
      const dataDirecciones = await dataDetailProfesores(
        `direccion/profesor/${id}`
      )
      if (!dataDirecciones.status == 200) {
        setDataDetail({ direcciones: null });
      }

      console.log("Datos direcciones:", dataDirecciones.data.data);


      setDataDetail({
        ...dataDetail,
        direcciones: dataDirecciones.data.data,
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
      case "Responsables":
        data = dataDetail.responsables[index];
        break;
      case "Historia clinica":
        data = dataDetail.historiaClinica[index];
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
   
    setModalOpen(true);
  };

  return (
    <div className="w-full space-y-2 grid gap-10">
    <HeaderData
      id={id}
      urlApi={"sql/estudiantes/header/"}
      typeLink={"back"}
    />
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
      </div>
      <UpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}

        >
          <ModalContentUpdate
            section={selectedSection}
         
           
  
  
          />
        </UpdateModal>
  </div>

  );
}
