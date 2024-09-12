import HeaderData from "../../../components/list/headerData/HeaderData";
import TableListAdmins from "../../../components/list/tables/TableListAdmin";

const List = () => {
  return (
    <>
      <main className="flex flex-col gap-8">
        <HeaderData />
        <p className="text-subTitle font-cocogooseSemiLight text-darkBlue">
          LISTA DE AMINISTRADORES
        </p>
        <TableListAdmins />
      </main>
    </>
  );
};

export default List;
