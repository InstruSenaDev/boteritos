import React from 'react'
import TableTrimestres from '../../components/tables/TableTrimestres'

 export const CrearTrimestres = () => {
  return (
    <>
      <main className="flex flex-col gap-8">

        <p className="text-subTitle font-cocogooseSemiLight text-darkBlue">
          LISTA DE ESTUDIANTES
        </p>
        <TableTrimestres/>
      </main>
    </>
  )
}

