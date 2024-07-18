import {Dropdown} from "../forms/Dropdown";
import { Input } from "../forms/Input";
import { UploadFile } from "../forms/UploadFile";
import { useState } from 'react';

export const Form = () => {
    const [showInput, setShowInput] = useState(true);
    return(
        <>
            <form class="flex max-w-[830px] w-full gap-x-[30px]">
                <div class="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-8 gap-x-8">
                    <Dropdown name={"rol"} label={"¿Que deseas crear?"} />
                    <Dropdown name={"matricula"} label={"Tipo de matricula"} />
                    <Input name={"nombre"} texto={"Nombre"} placeholder={"Nombre del usuario"} tipo={"text"}/>
                    <Input name={"apellidos"} texto={"Apellidos"} placeholder={"Apellido del usuario"} tipo={"text"}/>
                    <Dropdown name={"documento"} label={"Tipo de documento"} />
                    <Input name={"ndocumento"} texto={"Numero de documento"} placeholder={"Documento del usuario"} tipo={"text"}/>
                    <Input name={"direccion"} texto={"Dirección"} placeholder={"Dirección del usuario"} tipo={"text"}/>
                    <Input name={"comuna"} texto={"Comuna"} placeholder={"Comuna del usuario"} tipo={"text"}/>
                    <Input name={"correo"} texto={"Correo"} placeholder={"Correo electronico del usuario"} tipo={"text"}/>
                    <Dropdown name={"sexo"} label={"Sexo"} />
                    
                    {showInput ? (
        <Input
          texto="Instituto"
          placeholder="Ingrese el nombre del instituto"
          name="instituto"
          tipo="text"
        />
      ) : (
        <UploadFile title="Subir archivo" />
      )}
                    <UploadFile title={"Foto"}></UploadFile>
                </div>
            </form>
        </>
    )
}