import HeaderData from "../../../components/tables/headerData/HeaderData";
import TableListTeachers from "../../../components/tables/TableListTeachers";


const DataTeachers = () => {
  return (
    <>
    <main className="flex flex-col gap-8">
      <HeaderData/>
      <p className="text-subTitle font-cocogooseSemiLight text-darkBlue">
        LISTA DE PROFESORES
      </p>
      <TableListTeachers/>
    </main></>
  )
}

export default DataTeachers