import React from 'react'
import { LayoutGeneral } from '../../layouts/LayoutGeneral'

const AdminMain = () => {
  return (
    <LayoutGeneral titleHeader={"Administrador"}>
        <div className='flex justify-center'>
            <p className='font-cocogooseSemiLight text-darkBlue text-title'>¡Bienvenido Administrador!</p>
        </div>
    </LayoutGeneral>
  )
}

export default AdminMain