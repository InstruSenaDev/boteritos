import React from 'react'
import HeaderData from '../../components/tables/headerData/HeaderData'
import TableStudents from '../../components/tables/tableStudents'

const ListStudents = () => {
  return (
    <main class="flex flex-col gap-8">
        <HeaderData />
        <p class="text-subTitle font-cocogooseSemiLight text-darkBlue">LISTA DE ESTUDIANTES</p>
        <TableStudents />
    </main>
  )
}

export default ListStudents