import DataState from "../dataStates/DataState";
import { ObjLogrosCreados } from "../../../helper/objects/ListaLogros";
import Buscador from "../../search/Buscador";
import { useEffect, useState } from "react";
import { Input } from "../../forms/Input";
import { Dropdown } from "../../forms/Dropdown";
import { dataDoc } from "../../../helper/objects/dropdownArray";

import { LogrosModal } from "../../modales/LogrosModal";
import { Button } from "@tremor/react";

export default function TableListaLogros() {
  const [isConfirm, setIsConfirm] = useState(false);
  const [values, setValues] = useState({
    logro:"",
    tipo:""
  });

  const handleForm = (event) => {
    event.preventDefault();
    console.log(values);
     setValues({
    logro: "",
    tipo: ""
  });
    setIsConfirm(true);
  };


  // Estado para manejar el modal
  const [isOpen, setIsOpen] = useState(false);

  const[dataDropdown, setDataDropdown] = useState({
    dropdownTipo:[]
  })

  useEffect(()=>{
    const getDataDropdown = async () => {
      const resultTipo = await dataDoc();
      setDataDropdown({
        dropdownTipo : resultTipo
      });
    };
    getDataDropdown();
  }, [])
  // Estado para manejar la fila expandida
  const [openAcc, setOpenAcc] = useState(-1);

  // Maneja el cambio en los campos de entrada del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDropdownChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleOpenModal=()=>{
    setIsOpen(true)
    setIsConfirm(false); 
  }

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsConfirm(false); 
  };
  // Alterna la fila expandida en la tabla
  const toogleRow = (index) => {
    setOpenAcc(openAcc !== index ? index : -1);
  };

 

  return (
    <>
      <main className="bg-white rounded-xl py-7 px-8 w-full overflow-y-hidden">
        {/* Buscador */}
        <div className="flex gap-2 justify-between w-full pb-5">
          <Buscador />
          <Button onClick={handleOpenModal}><div className="flex gap-2 w-fit"><i className="fa-solid fa-plus border-2 rounded-full p-0.5"></i> <span className="hidden sm:block">Agregar logro</span></div></Button>
        </div>

        <section className="max-h-[80vh] overflow-y-scroll">
          {/* HEADER TABLA */}
          <div className="sticky hidden top-0 bg-white lg:grid grid-cols-[100px_minmax(450px,_1fr)_minmax(50px,_1fr)_minmax(150px,_1fr)_minmax(50px,1fr)] gap-x-8 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue">
            <p>No°</p>
            <p>Nombre del logro</p>
            <p>Fecha</p>
            <p>Estado</p>
            <p>Tipo</p>
          </div>

          {/* CUERPO DE LA TABLA */}
          {ObjLogrosCreados.map((data, index) => (
            <div
              className={`acc-item grid grid-cols-1 lg:grid-cols-[100px_minmax(450px,_1fr)_minmax(50px,_1fr)_minmax(150px,_1fr)_minmax(50px,1fr)] items-center gap-x-8 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${
                openAcc === index ? "open" : "close"
              }`}
              key={index}
            >
              <div className="flex gap-2 lg:gap-0 ">
                <p className="text-darkBlue lg:hidden">No°</p>
                <div className="acc-header w-full flex justify-between items-center ">
                  <p>
                    {(index + 1).toString().length === 2
                      ? index + 1
                      : `0${index + 1}`}
                  </p>
                  <button onClick={() => toogleRow(index)}>
                    <i className="fa-solid fa-angle-down block lg:hidden"></i>
                  </button>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Logro:</p>
                <div className="acc-header w-full">
                  <p>{`${data.achievement}`}</p>{" "}
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body ">
                <p className="text-darkBlue lg:hidden">Fecha:</p>
                <div className=" flex justify-self-center">
                  <p>{`${data.date}`}</p>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body ">
                <p className="text-darkBlue lg:hidden">Estado:</p>
                <div className="">
                  <DataState state={data.state} />
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body">
                <p className="text-darkBlue lg:hidden">Tipo:</p>
                <div>
                  <p>{`${data.type}`}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
      <LogrosModal
      txtmodal={'Crear nuevo logro'}
      isOpen={isOpen}
      onClose={handleCloseModal}
      onSubmit={handleForm}
      isConfirm={isConfirm}
      >
      <Dropdown
       label="Selecciona una opción"
       name="tipo"
       data={dataDropdown.dropdownTipo}  
       onChange={(value) => handleDropdownChange("tipo",value)}
      placeholder={"Seleccione el tipo de logro"}
      value={values.tipo || ""}
      />

       <Input
       texto={'Nombre del logro'}
       placeholder={'Ingresa el nombre del logro'}
       name={'logro'}
       tipo={'text'}
       onChange={handleInputChange}
       value={values.logro || ""}
       />
      </LogrosModal>
    </>
  );
}
