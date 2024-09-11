import HeaderData from "../../../components/list/headerData/HeaderData"
import TableListTeacher from "../../../components/list/tables/TableListTeachers"
const List = () => {
  return (
    <>
    <main className="flex flex-col gap-8">
      <HeaderData />
      <p className="text-subTitle font-cocogooseSemiLight text-darkBlue">
        LISTA DE PROFESORES
      </p>
      <TableListTeacher />
    </main></>
  )
}

export default List