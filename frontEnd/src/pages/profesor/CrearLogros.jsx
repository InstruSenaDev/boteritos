
import TableListaLogros from "../../components/tables/tableListaLogros";
import {LayoutGeneral} from "../../layouts/LayoutGeneral.jsx";

export const CrearLogros = () => {
  return (
    <LayoutGeneral titleHeader="Logros">
      <main class="flex flex-col w-full gap-y-8">
        <TableListaLogros />
      </main>
    </LayoutGeneral>
  );
};
