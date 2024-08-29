
import { Boton } from '../../components/forms/Boton'
import TableCalificarEstudiante from '../../components/tables/tableCalificarEstudiante'
import HeaderData from '../../components/tables/headerData/HeaderData'
import { Observacion } from '../../components/forms/Observacion'
import { useState } from 'react'
import { ConfirmationModal } from '../../components/modales/ConfirmationModal'
import { Button } from '@tremor/react'


export const Calificar = () => {

const [isOpen, setIsOpen]= useState(false);
  

const handleOpenModal = () => {
    setIsOpen(true);
}
const handleCloseModal = () => {
    setIsOpen(false);
}
    return (
        <>
            <main className="flex flex-col w-full gap-y-8">
                <HeaderData/>
                <TableCalificarEstudiante/>

                <div className="bg-white rounded-xl py-7 px-8 w-full overflow-y-hidden">
                    <Observacion texto={"Observaciones"} placeholder={"Ingresa una observación"}></Observacion>
                    {/*<Observacion title="Generar automaticamente" observacion="el estudiante cumple con todos los logros solicitados y es aplicado" />*/}

                </div>

                <div className="w full flex justify-end gap-x-3">
              
                    <Boton text="Guardar" type="white" />
                    <Button onClick={handleOpenModal} className='max-w-[400px] min-w-28 w-full h-[50px] rounded-xl font-cocogooseRegular tracking-widest text-button text-white' >Enviar</Button>
                   
                   
                </div>
            <ConfirmationModal 
             isOpen={isOpen}
             onClose={handleCloseModal}
             txtQuestion={"¿Está seguro de crear el informe?"}
             txtWarning={"Despues de creado no podra revertir el cambio"}
             >

            </ConfirmationModal>
             
            </main>

        </>
    )
}

