import React from 'react'
import HeaderData from '../../components/tables/headerData/HeaderData'
import TableStudents from '../../components/estudiantes/tableStudents'

{/*posible archivo a borrar*/}

export const ListStudentsSection = () => {
  return (
    <main className="flex flex-col gap-8">
        <HeaderData />
        <p className="text-subTitle font-cocogooseSemiLight text-darkBlue">LISTA DE ESTUDIANTES</p>
        <TableStudents />
    </main>
  )
}
