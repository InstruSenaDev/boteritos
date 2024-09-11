import React from 'react'
import {CrearTrimestres} from '../../sections/admin/CrearTrimestres.jsx'
import { LayoutGeneral } from '../../layouts/LayoutGeneral.jsx'
const Trimestres = () => {
  return (
    <LayoutGeneral titleHeader={"Trimestres"} title={"Crear Trimestres"}>
      <CrearTrimestres/>
    </LayoutGeneral>
  )
}

export default Trimestres