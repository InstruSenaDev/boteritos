import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GrupoDatoElemento } from "../../../components/datosEstudiante/GrupoDatoElemento";
import HeaderData from "../../../components/list/headerData/HeaderData";
import { GrupoDatos } from "../../../components/list/groupData/GrupoDatos";

import { dataPersonal } from "../../../helper/objects/dataStudentsArray";

import { UpdateModal } from "../../../components/modales/UpdateModal";
import {
  dataDetailEstudiante,
  dataResponsableEstudiante,
} from "../../../api/get";

const Detail = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [sectionData, setSectionData] = useState(null); //para almacenar los datos de cada sección
  const [isModalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const [dataDetail, setDataDetail] = useState({
    historiaClinica: [],
    responsables: [],
  });

  //historiaclinica/?idestudiante=2

  useEffect(() => {
    const obtainData = async () => {
      const dataHistClinic = await dataDetailEstudiante(
        `historiaclinica/${id}`
      );

      const dataResponsable = await dataResponsableEstudiante(
        `responsable/${id}`
      );

      if (!dataHistClinic.status == 200) {
        setDataDetail({ historiaClinica: null });
      }

      if (!dataResponsable.status == 200) {
        setDataDetail({ responsables: null });
      }

      setDataDetail({
        ...dataDetail,
        historiaClinica: dataHistClinic.data.data,
        responsables: dataResponsable.data.data,
      });
    };

    obtainData();
  }, []);

  const update = (sectionId, data) => {
    console.log(id);
    console.log("secion ,");

    setSelectedSection(sectionId);
    setSectionData(data); //para establecer los datos de la sección
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedSection(null);
    setSectionData(null);
  };

  const handleSave = () => {
    const newData = {
      section: selectedSection,
      data: sectionData,
    };
    console.log("Datos guardados", newData);
    closeModal();
  };

  const handleInputChange = (e, key) => {
    setSectionData({
      ...sectionData,
      [key]: e.target.value,
    });
  };

  const filterData = (data) => {
    // Filtra los campos que contienen IDs (asumiendo que todos los IDs tienen 'id' en su nombre)
    return Object.keys(data)
      .filter((key) => !key.toLowerCase().includes("id"))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
  };

  const formatLabel = (key) => {
    // Convierte la primera letra a mayúscula y agrega espacios antes de mayúsculas.
    return key
      .replace(/([A-Z])/g, " $1") // Agrega un espacio antes de  cada mayúscula.
      .replace(/^./, (str) => str.toUpperCase()); // Convierte la primera letra a mayúscula.
  };

  return (
    <div className="w-full space-y-2 grid gap-10">
      <HeaderData
        id={id}
        urlApi={"sql/estudiantes/header/"}
        typeLink={"back"}
      />
      <GrupoDatoElemento /> {/* BOTONES PARA LOS MODALES */}
      <div className="w-full h-0 border-darkBlue border-2"></div>
      <div className="space-y-7">
        {dataDetail.responsables && dataDetail.responsables.map((value, index) => (
          <GrupoDatos
            titulo={"Responsables"}
            update={() => update("Historia clinica", dataPersonal[0])}
            data={dataDetail.responsables}
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
                  {value.numerodocumento}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Telefono:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.telefono}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Profesion:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.profesion}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Ocupacion:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.ocupacion}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Empresa:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.empresa}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Parentesco:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.tipoparentesco}
                </p>
              </div>
            </div>
          </GrupoDatos>
        ))}
        {dataDetail.historiaClinica && dataDetail.historiaClinica.map((value, index) => (
          <GrupoDatos
            titulo={"Historia Clinica"}
            update={() => update("Historia clinica", dataPersonal[0])}
            data={dataDetail.historiaClinica}
            key={index}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Medicamentos:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.medicamentos}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Restricciones Alimenticias:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.restriccionesalimenticias}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Observacion:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {value.observacion}
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
        <h2 className="text-paragraph font-cocogooseLight">
          Editando sección: {selectedSection}
        </h2>
        {sectionData && (
          <div>
            {Object.keys(filterData(sectionData)).map((key) => (
              <div key={key} className="mb-4">
                <label className="blocktext-paragraph font-cocogooseLight text-black">
                  {formatLabel(key)}:
                </label>
                <input
                  type="text"
                  value={sectionData[key]}
                  onChange={(e) => handleInputChange(e, key)}
                  className="p-2 rounded-xl w-full px-5 text-paragraph3 border-darkBlue font-cocogooseLight border-[1.5px] focus:ring focus:selection focus:outline-none"
                />
              </div>
            ))}
          </div>
        )}
      </UpdateModal>
    </div>
  );
};

/**
 
  <GrupoDatos
    titulo={"Teléfonos"}
    update={() => update("Teléfonos", dataTelefono[0])}
  >
    {dataTelefono.map((dataKey) => (
      <div
        key={dataKey.idTelefono}
        className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3"
      >
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Teléfono 1:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.primerTelefono}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Teléfono 2:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.segundoTelefono}
          </p>
        </div>
      </div>
    ))}
  </GrupoDatos>
  <GrupoDatos
    titulo={"Responsable"}
    update={() => update("Responsable", dataResponsable[0])}
  >
    {dataResponsable.map((dataKey) => (
      <div
        key={dataKey.idResponsable}
        className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3"
      >
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Nombre:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.nombre}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Parentesco:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.parentesco}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Tipo de Documento:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.tipoDeDocumento}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Número de Documento:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.numeroDeDocumento}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Teléfono 1:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.primerTelefono}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Teléfono 2:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.segundoTelefono}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Dirección:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.direccion}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Empresa:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.empresa}
          </p>
        </div>
      </div>
    ))}
  </GrupoDatos>

  <GrupoDatos
    titulo={"Condición Médica"}
    update={() => update("condición medica", dataCondicionMedica[0])}
  >
    {dataCondicionMedica.map((dataKey) => (
      <div
        key={dataKey.idCondicionMedica}
        className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3"
      >
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            EPS:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.eps}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            RH:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.rh}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Peso:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.peso}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Estatura:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.estatura}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Lugar de Atención:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.lugarDeAtencion}
          </p>
        </div>
      </div>
    ))}
  </GrupoDatos>

  <DatosHistoria
    titulo={"Historia Clínica"}
    update={() => update("Historia clinica", dataHistoriaClinica[0])}
  >
    {dataHistoriaClinica.map((dataKey) => (
      <div
        key={dataKey.idHistoriaClinica}
        className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3"
      >
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Diagnóstico:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.diagnostico}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Medicamentos:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.medicamentos}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Restricciones Alimenticias:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.restriccionesAlimenticias}
          </p>
        </div>
        <div>
          <p className="font-cocogooseLight text-paragraph text-darkBlue">
            Alergias:
          </p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">
            {dataKey.alergias}
          </p>
        </div>
      </div>
    ))}
  </DatosHistoria>
  
 */
export default Detail;
