import { Button } from '@tremor/react'
import React, { useState } from 'react'
import Buscador from '../search/Buscador';
import { objTrimestres } from '../../helper/objects/Trimestres';
import { LogrosModal } from '../modales/LogrosModal';
import { Input } from '../forms/Input';

export default function TableTrimestres () {
  const [isConfirm, setIsConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState(-1);
  const [values, setValues] = useState({
    fechainicio:"",
    fechafinal:""
  });

  const handleForm = (event) => {
    event.preventDefault();
    console.log(values);
     setValues({
    fechainicio: "",
    fechafinal: ""
  });
    setIsConfirm(true);
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
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  
  return (
  
<>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        {/*BUSCADOR Y MÁS */}

        <header className="flex gap-2 justify-between w-full pb-5">
          <Buscador />
          <Button onClick={handleOpenModal}><div className="flex gap-2 w-fit"><i className="fa-solid fa-plus border-2 rounded-full p-0.5"></i> <span className="hidden sm:block">Crear trimestre</span></div></Button>
        </header>

        <section className="max-h-[80vh] overflow-y-scroll">
          {/* HEADER TABLA */}
          <div className="sticky top-0 lg:grid grid-cols-[150px_minmax(400px,_1fr)_repeat(2,_minmax(350px,_1fr))_minmax(150px,_1fr)] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden">
            <p>No°</p>
            <p>Trimestre</p>
            <p>Fecha inicio</p>
            <p>Fecha final</p>
            <p>Estado</p>
          </div>
          {/*CUERPO DE LA TABLA */}
          {objTrimestres.map((data,index )=>(
             <div
             className={`acc-item grid grid-cols-1 lg:grid-cols-[150px_minmax(400px,_1fr)_repeat(2,_minmax(350px,_1fr))_minmax(150px,_1fr)] items-center gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${
               openAcc === index ? "open" : "close"
             }`}
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
                <p className="text-darkBlue lg:hidden">Trimestre:</p>
                <div className="acc-header w-full">
                  <p>{`${data.trimestre}`}</p>{" "}
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body">
                <p className="text-darkBlue lg:hidden">Fecha inicio:</p>
                <div className="w-full">
                  <p>{`${data.fechainicio}`}</p>{" "}
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body">
                <p className="text-darkBlue lg:hidden">Fecha final:</p>
                <div className="w-full">
                  <p>{`${data.fechafinal}`}</p>{" "}
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body">
                <p className="text-darkBlue lg:hidden">Estado:</p>
                <div className="w-full">
                  <p>{`${data.estado}`}</p>{" "}
                </div>
              </div>

           </div>
          ))}
       
        </section>
      </main>
      <LogrosModal txtmodal={'Crear nuevo trimestre'}
      isOpen={isOpen}
      onClose={handleCloseModal}
      onSubmit={handleForm}
      isConfirm={isConfirm}>

        <Input
       texto={'Fecha inicio'}
       placeholder={'Ingresa la fecha de inicio'}
       name={'trimestre'}
       tipo={'text'}
       onChange={handleInputChange}
       value={values.fechainicio || ""}
       />
       
       <Input
       texto={'Fecha inicio'}
       placeholder={'Ingresa la fecha de inicio'}
       name={'trimestre'}
       tipo={'text'}
       onChange={handleInputChange}
       value={values.fechafinal || ""}
       />

   </LogrosModal>
      
      </>
  )
}
