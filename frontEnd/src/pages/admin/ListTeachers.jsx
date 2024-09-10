import React from 'react'
import DataTeachers from '../../sections/admin/DataTeachers'
import { LayoutGeneral } from '../../layouts/LayoutGeneral'

const ListTeachers = () => {
  return (
    <LayoutGeneral titleHeader="Profesores">
      <DataTeachers/>
    </LayoutGeneral>
  )
}

export default ListTeachers