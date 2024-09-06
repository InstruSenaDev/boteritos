import React from 'react';
import { RegisterOption } from '../../components/buttons/RegisterOption';
import { LayoutGeneral } from '../../layouts/LayoutGeneral';

export const MultiStepRegister = () => {
  return (
    <LayoutGeneral>
        <div className='flex flex-col justify-center gap-y-7'>
            <p className='font-cocogooseLight text-title'>¿Que desea crear?</p>
            <div className='flex flex-col xl:flex-row justify-between gap-y-7'>
                <RegisterOption text={"Alumno"} icon={"fa-solid fa-star"}/>
                <RegisterOption text={"Alumno"} icon={"fa-solid fa-star"}/>
                <RegisterOption text={"Alumno"} icon={"fa-solid fa-star"}/>
            </div>
        </div>
    </LayoutGeneral>
  )
}
