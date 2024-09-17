import HeaderData from '../../components/list/headerData/HeaderData'
import TablesStudentsTeacher from '../../components/list/tables/TablesStudentsTeacher'

{/*posible archivo a borrar*/}

export const ListStudentsSection = () => {
  return (
    <main className="flex flex-col gap-8">
        <HeaderData />
        <p className="text-subTitle font-cocogooseSemiLight text-darkBlue">LISTA DE ESTUDIANTES</p>
        <TablesStudentsTeacher />
    </main>
  )
}
