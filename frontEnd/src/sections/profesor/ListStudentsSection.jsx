import HeaderData from '../../components/list/headerData/HeaderData'
import TableStudents from '../../components/list/tables/TableStudents'

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
