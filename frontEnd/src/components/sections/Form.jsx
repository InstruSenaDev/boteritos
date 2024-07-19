import React, { useState } from 'react';
import { Dropdown } from "../forms/Dropdown";
import { Input } from "../forms/Input";
import { UploadFile } from "../forms/UploadFile";
import { dataDoc, dataRol, dataSexo, dataMatricula } from "../../helper/objects/dropdownArray.js";

export const Form = () => {
    // Estado para almacenar el rol seleccionado
    const [selectedRole, setSelectedRole] = useState('');

    // Función para manejar cambios en el dropdown de rol
    const handleRoleChange = (value) => {
        setSelectedRole(value);
    }

    // Función genérica para manejar cambios en otros dropdowns
    const handleDropdownChange = (value) => {
        console.log("Selected value: ", value); // O no hacer nada
    }

    return (
        <>
            <form className="flex max-w-[830px] w-full gap-x-[30px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-8 gap-x-8">
                    {/* Dropdown para seleccionar el rol */}
                    <Dropdown name={"rol"} label={"¿Que deseas crear?"} data={dataRol} onChange={handleRoleChange} />
                    {/* Dropdown para seleccionar el tipo de matrícula */}
                    <Dropdown name={"matricula"} label={"Tipo de matricula"} data={dataMatricula} onChange={handleDropdownChange} />
                    <Input name={"nombre"} texto={"Nombre"} placeholder={"Nombre del usuario"} tipo={"text"} />
                    <Input name={"apellidos"} texto={"Apellidos"} placeholder={"Apellido del usuario"} tipo={"text"} />
                    {/* Dropdown para seleccionar el tipo de documento */}
                    <Dropdown name={"documento"} label={"Tipo de documento"} data={dataDoc} onChange={handleDropdownChange} />
                    <Input name={"ndocumento"} texto={"Numero de documento"} placeholder={"Documento del usuario"} tipo={"text"} />
                    <Input name={"direccion"} texto={"Dirección"} placeholder={"Dirección del usuario"} tipo={"text"} />
                    <Input name={"comuna"} texto={"Comuna"} placeholder={"Comuna del usuario"} tipo={"text"} />
                    <Input name={"correo"} texto={"Correo"} placeholder={"Correo electronico del usuario"} tipo={"text"} />
                    {/* Dropdown para seleccionar el sexo */}
                    <Dropdown name={"sexo"} label={"Sexo"} data={dataSexo} onChange={handleDropdownChange} />
                    {/* Renderización condicional del campo "instituto" */}
                    {selectedRole !== '1' && selectedRole !== '2' ? (
                        <Input name={"instituto"} texto={"Instituto"} placeholder={"Instituto del usuario"} tipo={"text"} />
                    ) : (
                        <UploadFile title={"Hoja de vida"} />
                    )}
                    <UploadFile title={"Foto"} />
                </div>
            </form>
        </>
    );
}