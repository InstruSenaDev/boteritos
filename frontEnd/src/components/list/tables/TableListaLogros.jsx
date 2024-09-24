import DataState from "../dataStates/DataState";
import { ObjLogrosCreados } from "../../../helper/objects/ListaLogros";
import Buscador from "../../search/Buscador";
import { useEffect, useState } from "react";
import { Input } from "../../forms/Input";
import { Dropdown } from "../../forms/Dropdown";
import { dataTipoLogro } from "../../../helper/objects/dropdownArray";
import { jwtDecode } from "jwt-decode";

import { ModalCreacion } from "../../modales/ModalCreacion";
import { Button } from "@tremor/react";
import { caseLogros } from "../../../helper/validators/case/logros";
import { LogrosRecibidosModal } from "../../modales/LogrosRecibidosModal";

export default function TableListaLogros() {
  const [isConfirm, setIsConfirm] = useState(false);
  // Estado para manejar el modal
  const [isOpen, setIsOpen] = useState(false);

  const [errors, setErrors] = useState({}); // Estado para los errores

  const [isOpenLogro, setIsisOpenLogro] = useState(false);

  const [estadoValida, setEstadoValida] = useState(false);

  const [selectedLogro, setSelectedLogro] = useState(null);

  const [dataDropdown, setDataDropdown] = useState({
    dropdownTipo: [],
  });

  const [logros, setLogros] = useState([]); // Estado para almacenar los logros
  // Decodifica el token
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const decodedToken = jwtDecode(access_token);
  const idprofesor = decodedToken.idjob; // Extrae el idwork del token
  const trimestre = JSON.parse(localStorage.getItem("trimestre")); //Trimestre

  const tipoLogroMap = {
    1: "Conocer",
    2: "Hacer",
    3: "Ser",
  };

  const [values, setValues] = useState({
    logro: "",
    estado: 2,
    observacion: "En espera",
    idtipologro: "",
    idtrimestre: "1",
    idprofesor: idprofesor, //LOCAL STORAGE
  });
  useEffect(() => {
    const getDataDropdown = async () => {
      const resultTipo = await dataTipoLogro();
      setDataDropdown({
        dropdownTipo: resultTipo,
      });
    };
    getDataDropdown();
  }, []);
  
  useEffect(() => {
    const getLogros = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v3/logros/listlogros/profesor/${trimestre}/${idprofesor}/`
        );
  
        if (response.ok) {
          const result = await response.json();
          console.log(result); // Verifica la estructura de result
          if (Array.isArray(result.data)) { // Asegúrate de acceder a la propiedad data
            setLogros(result.data); // Almacena el array en el estado
          } else {
            console.error("La propiedad 'data' no es un array:", result.data);
          }
        } else {
          console.error("Error al obtener los logros:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener los logros:", error.message);
      }
    };
    getLogros();
  }, [idprofesor, trimestre]);

  // Estado para manejar la fila expandida
  const [openAcc, setOpenAcc] = useState(-1);
  // Maneja el cambio en los campos de entrada del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };
  const handleDropdownChange = (name, value) => {
    setValues({ ...values, [name]: value });
    console.log("dropdowns value:", value);

    // Limpiar error al escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };
  const handleOpenModal = () => {
    setIsOpen(true);
    setIsConfirm(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsConfirm(false);
  };

  const handleOpenLogroModal = (logro) => {
    setSelectedLogro(logro);
    setIsisOpenLogro(true);
  };

  const handleCloseLogroModal = () => {
    setIsisOpenLogro(false);
  };

  // Alterna la fila expandida en la tabla
  const toogleRow = (index) => {
    setOpenAcc(openAcc !== index ? index : -1);
  };

  const postLogro = async (dataModal) => {
    // Agregar el trimestre al objeto dataModal
    const completeData = {
      ...dataModal,
      idtrimestre: trimestre,
    };
    try {
      const response = await fetch(
        `http://localhost:8000/api/v3/logros/logro/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completeData),
        }
      );

      if (response.ok) {
        // Verifica si la respuesta fue exitosa (status en el rango 200-299)
        const data = await response.json();
        console.log("Datos enviados correctamente:", data);
        setEstadoValida(true); // Cambiar estado cuando el usuario se cree exitosamente
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
    }
  };

  const handleForm = async (event) => {
    event.preventDefault();

    // Validar todos los campos antes de enviar
    const newErrors = {};
    for (const key in values) {
      if (Object.hasOwn(values, key)) {
        const error = caseLogros(key, values[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Mostrar errores solo si hay campos inválidos
      return;
    }
    // Si no hay errores, enviar los datos
    const dataUser = {
      ...values,
      logro: values.logro.trim(),
    };
    await postLogro(dataUser);

    setIsConfirm(true);
  };

  return (
    <>
      <main className="bg-white rounded-xl py-7 px-8 w-full overflow-y-hidden">
        {/* Buscador */}
        <div className="flex gap-2 justify-between w-full pb-5">
          <Buscador />
          <Button onClick={handleOpenModal}>
            <div className="flex gap-2 w-fit">
              <i className="fa-solid fa-plus border-2 rounded-full p-0.5"></i>{" "}
              <span className="hidden sm:block">Agregar logro</span>
            </div>
          </Button>
        </div>

        <section className="max-h-[80vh] overflow-y-scroll">
          {/* HEADER TABLA */}
          <div className="sticky hidden top-0 bg-white lg:grid grid-cols-[100px_minmax(450px,_1fr)_minmax(50px,_1fr)_minmax(150px,_1fr)_minmax(50px,1fr)] gap-x-8 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue">
            <p>No°</p>
            <p>Nombre del logro</p>
            <p>Estado</p>
            <p>Tipo</p>
          </div>

          {logros.map((data, index) => (
  <div
    className={`acc-item grid grid-cols-1 lg:grid-cols-[100px_minmax(450px,_1fr)_minmax(50px,_1fr)_minmax(150px,_1fr)_minmax(50px,1fr)] items-center gap-x-8 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${
      openAcc === index ? "open" : "close"
    }`}
    key={data.idlogro} // Usar idlogro como key
  >
    <div className="flex gap-2 lg:gap-0 ">
      <p className="text-darkBlue lg:hidden">No°</p>
      <div className="acc-header w-full flex justify-between items-center ">
        <p>{(index + 1).toString().padStart(2, '0')}</p>
        <button onClick={() => toogleRow(index)}>
          <i className="fa-solid fa-angle-down block lg:hidden"></i>
        </button>
      </div>
    </div>

    <div className="flex gap-2 lg:gap-0">
      <p className="text-darkBlue lg:hidden">Logro:</p>
      <div
        className="acc-header w-full underline cursor-pointer"
        onClick={() => handleOpenLogroModal(data)}
      >
        <p>{data.logro}</p> {/* Mostrar el logro */}
      </div>
    </div>

    

    <div className="flex gap-2 lg:gap-0 acc-body ">
      <p className="text-darkBlue lg:hidden">Estado:</p>
      <div className="">
        <DataState state={Number(data.estado)} /> {/* Usar el estado */}
      </div>
    </div>

    <div className="flex gap-2 lg:gap-0 acc-body">
      <p className="text-darkBlue lg:hidden">Tipo:</p>
      <div>
      <p>{tipoLogroMap[data.idtipologro] || 'Tipo no disponible'}</p> {/* Mostrar el tipo basado en el mapeo */}
      </div>
    </div>
  </div>
))}
        </section>
      </main>
      <ModalCreacion
        txtmodal={"Crear nuevo logro"}
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSubmit={handleForm}
        isConfirm={isConfirm}
      >
        <Dropdown
          label="Selecciona una opción"
          name="idtipologro"
          data={dataDropdown.dropdownTipo}
          onChange={(value) => handleDropdownChange("idtipologro", value)}
          placeholder={"Seleccione el tipo de logro"}
          value={values.idtipologro || ""}
          error={errors.idtipologro}
        />

        <Input
          texto={"Nombre del logro"}
          placeholder={"Ingresa el nombre del logro"}
          name={"logro"}
          tipo={"text"}
          onChange={handleInputChange}
          value={values.logro || ""}
          error={errors.logro}
        />
      </ModalCreacion>

      <LogrosRecibidosModal
        isOpen={isOpenLogro}
        onClose={handleCloseLogroModal}
        txtmodal={"Observaciones del admin"}
        tipo={tipoLogroMap[selectedLogro?.idtipologro] || 'Tipo no disponible'}
        nombre={selectedLogro?.logro || 'Nombre no disponible'}
        descripcion={selectedLogro?.observacion || 'Observación no disponible'}
      ></LogrosRecibidosModal>
    </>
  );
}
