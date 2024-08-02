
import { Boton } from '../../components/forms/Boton'
import TableCalificarEstudiante from '../../components/tables/tableCalificarEstudiante'
import HeaderData from '../../components/tables/headerData/HeaderData'

export const Calificar = () => {
    return (
        <>
            <main class="flex flex-col w-full gap-y-8">
                <HeaderData/>
                <TableCalificarEstudiante/>

                <div class="bg-white rounded-xl py-7 px-8 w-full overflow-y-hidden">
                    {/*<Observacion title="Generar automaticamente" observacion="el estudiante cumple con todos los logros solicitados y es aplicado" />*/}
                </div>

                <div class="w full flex justify-end gap-x-3">
                    <Boton text="Guardar" type="white" />
                    <Boton text="Enviar" type="blue" />
                </div>
            </main>

        </>
    )
}

