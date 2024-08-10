import React from 'react'
import HeaderData from '../../components/tables/headerData/HeaderData'
import TableStudents from '../../components/tables/tableStudents'

const ListStudents = () => {
  return (
    <main className="flex flex-col gap-8">
        <HeaderData />
        <p className="text-subTitle font-cocogooseSemiLight text-darkBlue">LISTA DE ESTUDIANTES</p>
        <TableStudents />
    </main>
  )
}

export default ListStudents