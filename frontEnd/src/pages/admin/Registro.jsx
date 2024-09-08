import React from 'react';
import { RegisterOption } from '../../components/buttons/RegisterOption';
import { LayoutGeneral } from '../../layouts/LayoutGeneral';
import { Link } from 'react-router-dom';

export const Registro = () => {
  return (
    <LayoutGeneral titleHeader={"Registro"}>
        <div className='h-full flex flex-col flex-wrap justify-center gap-y-5'>
            <p className='font-cocogooseLight text-title text-center text-darkBlue'>¿Que desea crear?</p>
            <div className='flex flex-col xl:flex-row justify-between gap-y-7'>
                <RegisterOption text={"Estudiante"} icon={"fa-solid fa-graduation-cap"} />
                <RegisterOption text={"Profesor"} icon={"fa-solid fa-user-tie"} />
                <RegisterOption text={"Administrador"} icon={"fa-solid fa-star"} link={"registro/admin"} />
            </div>
        </div>
    </LayoutGeneral>
  )
}
