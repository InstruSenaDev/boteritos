import React, { useState, useEffect } from "react";
import Buscador from "../search/Buscador";
import { LogrosRecibidosModal } from "../modales/LogrosRecibidosModal";
import { ConfirmationModal } from "../modales/ConfirmationModal";
import { RegisterModal } from "../modales/RegisterModal";
import { Input } from "../forms/Input"
import { jwtDecode } from "jwt-decode";

export const TablaLogrosRecibidos = () => {
  const [openAcc, setOpenAcc] = useState(-1);
  const [isLogroModalOpen, setIsLogroModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [isRejectedModalOpen, setIsRejectedModalOpen] = useState(false);


  const [selectedLogro, setSelectedLogro] = useState(null);
  const [estadoValida, setEstadoValida] = useState(false);
  const [modalAction, setModalAction] = useState(""); // Nuevo estado para definir si es "aceptar" o "rechazar"
  const [logros, setLogros] = useState([]); // Estado para almacenar los logros.

  const toggleRow = (index) => {
    setOpenAcc(openAcc !== index ? index : -1);
  };
  const [values, setValues] = useState({
    observacion: "",
  });
  // Maneja cambios en los inputs de texto
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(values)
  };


  // Función para obtener los logros desde la API
  const getLogros = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v3/logros/listlogros/admin/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos recibidos:", data);

        // Asegúrate de acceder a 'data' dentro de la respuesta
        return Array.isArray(data.data) ? data.data : [];
      } else {
        console.error("Error al obtener los datos:", response.statusText);
        return []; // Retorna un array vacío si la solicitud falla
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
      return []; // Retorna un array vacío en caso de error
    }
  };

  useEffect(() => {
    const fetchLogros = async () => {
      const data = await getLogros();
      console.log('Logros recibidos:', data); // Verifica que aquí lleguen los logros
      setLogros(data || []); // Almacena los logros en el estado
    };

    fetchLogros(); // Ejecuta la función cuando el componente se monta
  }, []);

  const handleOpenLogroModal = (logro) => {
    console.log("ID del logro seleccionado:", logro.idlogro);
    setSelectedLogro(logro);
    setIsLogroModalOpen(true);
  };

  const handleCloseLogroModal = () => {
    setIsLogroModalOpen(false);
  };

  const handleOpenConfirmationModal = (action, logro) => {
    console.log("ID del logro para confirmación:", logro.idlogro);
    setModalAction(action);
    setSelectedLogro(logro); // Guarda el logro seleccionado
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleRejectedModalOpen = (logro) => {
    console.log("ID del logro para rechazo:", logro.idlogro); 
    setSelectedLogro(logro); // Guarda el logro seleccionado
    setIsRejectedModalOpen(true);
  }

  const handleCloseRejectedModal = () => {
    setIsRejectedModalOpen(false)
  }

  // Función para actualizar el estado del logro
  const updateLogroState = async (logro) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v3/logros/logro/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idlogro: logro.idlogro,
          estado: 1,
          observacion: "Aceptado", // Agrega observación si está disponible
          idtrimestre: logro.idtrimestre,
          idtipologro: logro.idtipologro,
          idprofesor: logro.idprofesor,
          logro: logro.logro
        }), // Actualiza el estado del logro y otros campos
      });
    
      if (response.ok) {
        console.log("Logro actualizado exitosamente");
        // Actualiza la lista de logros
        const updatedLogros = logros.map((logro) =>
          logro.idlogro === selectedLogro.idlogro ? { ...logro, estado: 1 } : logro
        );
        setLogros(updatedLogros);
      } else {
        console.error("Error al actualizar el logro:", response.statusText);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  };
  

  // Manejador del botón de "Continuar" en el modal de confirmación
  const handleConfirm = () => {
    if (selectedLogro) {
      updateLogroState(selectedLogro);
    }
    handleCloseConfirmationModal();
  };


  return (
    <>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        <div className="flex gap-2 justify-between w-full pb-5">
          <Buscador />
        </div>

        <section className="max-h[80vh] overflow-y-scroll">
          <div className="sticky top-0 lg:grid grid-cols-[150px_minmax(400px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden">
            <p>No°</p>
            <p>Nombre del logro</p>
            <p>Profesor</p>
            <p>Área</p>
            <p className="text-center">Acción</p>
          </div>
          {/* Reemplazar el mapeo de dataTeacher con logros */}
          {logros.map((logro, index) => (
            <div
              className={`acc-item grid grid-cols-1 lg:grid-cols-[150px_minmax(400px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] items-center gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${openAcc === index ? "open" : "close"}`}
              key={index}
            >
              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">No°</p>
                <div className="acc-header w-full flex justify-between items-center">
                  <p className="pl-2">{logro.idlogro.toString().length === 2 ? logro.idlogro : `${logro.idlogro}`}</p>
                  <button onClick={() => toggleRow(index)}>
                    <i className="fa-solid fa-angle-down block lg:hidden"></i>
                  </button>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0" onClick={() => handleOpenLogroModal(logro)}>
                <p className="text-darkBlue lg:hidden">Nombre:</p>
                <div className="acc-header max-w-[300px] w-full flex justify-between items-center">
                  <p className="underline cursor-pointer">{logro.logro}</p>
                </div>
              </div>

              <div className="acc-body max-w-[200px] w-full flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Profesor:</p>
                <div className="w-full flex justify-between items-center">
                  <p>{logro.nombre}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Área:</p>
                <div className="w-full flex justify-between items-center">
                  <p>{logro.area}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0 items-center">
                <p className="text-darkBlue lg:hidden text-center">Acción:</p>
                <div className="w-full flex justify-center items-center gap-3">
                  <i
                    className="fa-solid fa-circle-check text-2xl cursor-pointer text-green-700"
                    onClick={() => handleOpenConfirmationModal("Aceptar", logro)}
                  ></i>
                  <i
                    className="fa-solid fa-circle-xmark text-2xl cursor-pointer text-redFull"
                    onClick={() => handleRejectedModalOpen(logro)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {selectedLogro && (
        <LogrosRecibidosModal
          txtmodal="Detalle del logro"
          isOpen={isLogroModalOpen}
          onClose={handleCloseLogroModal}
          tipo={selectedLogro.area || "N/A"}
          nombre={selectedLogro.logro || "N/A"}
          descripcion={selectedLogro.descripcion || "No disponible"}
        />
      )}
      <RegisterModal
        txtmodal={"¿Está seguro de rechazar el logro?"}
        cols={"1"}
        isOpen={isRejectedModalOpen}
        onClose={handleCloseRejectedModal}
        onSubmit={handleFormSubmit}
      >
        <p>Al hacer clic en "Agregar", se rechazará el logro y se le enviará la observación al profesor</p>
        <Input
          placeholder={"Observación o recomendación"}
          texto={"Agregue una observación al logro"}
          name={"observacion"}
          onChange={handleInputChange}
        />

      </RegisterModal>


      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        txtQuestion={`¿Está seguro de ${modalAction} este logro?`}
        txtWarning={`Si presionas ${modalAction.toLowerCase()}, no podrás modificar esta selección. Por favor, asegúrate de que la acción es correcta antes de continuar.`}
        onConfirm={handleConfirm}
      />
    </>
  );
};
