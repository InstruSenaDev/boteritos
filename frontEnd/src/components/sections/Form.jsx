import React, { useState } from 'react';
import { Dropdown } from "../forms/Dropdown";
import { Input } from "../forms/Input";
import { UploadFile } from "../forms/UploadFile";
import { dataDoc, dataRol, dataSexo, dataMatricula } from "../../helper/objects/dropdownArray.js";
import { Boton } from '../forms/Boton.jsx'; 

export const Form = () => {

    // Estado para almacenar los valores de los inputs
    const [values, setValues] = useState({
        rol: "",
        matricula: "",
        nombre: "",
        apellidos: "",
        documento: "",
        ndocumento: "",
        direccion: "",
        comuna: "",
        correo: "",
        sexo: "",
        instituto: "",
    });

    // Función para manejar cambios en los inputs de texto
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    // Función para manejar el envío del formulario
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Inputs value:", values); // Mostrar los valores de los inputs en la consola
    }

    // Estado para almacenar el rol seleccionado
    const [selectedRole, setSelectedRole] = useState('');

    // Función para manejar cambios en el dropdown de rol
    const handleRoleChange = (value) => {
        setSelectedRole(value);
        setValues({ ...values, rol: value }); // actualizar el estado de 'rol'
        console.log("rol value:", value); // Mostrar el valor seleccionado del rol en la consola
    }

    // Función genérica para manejar cambios en otros dropdowns
    const handleDropdownChange = (name, value) => {
        setValues({ ...values, [name]: value });
        console.log("dropdowns value:", value); // Mostrar el valor seleccionado de los otros dropdowns en la consola
    }

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col max-w-[830px] w-full gap-x-[30px] gap-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-8 gap-x-8">
                {/* Dropdown para seleccionar el rol */}
                <Dropdown name={"rol"} label={"¿Qué deseas crear?"} data={dataRol} onChange={handleRoleChange} />
                {/* Dropdown para seleccionar el tipo de matrícula */}
                <Dropdown name={"matricula"} label={"Tipo de matrícula"} data={dataMatricula} onChange={(value) => handleDropdownChange('matricula', value)} />
                <Input name={"nombre"} texto={"Nombre"} placeholder={"Nombre del usuario"} tipo={"text"} onChange={handleInputChange} value={values.nombre} />
                <Input name={"apellidos"} texto={"Apellidos"} placeholder={"Apellido del usuario"} tipo={"text"} onChange={handleInputChange} value={values.apellidos} />
                {/* Dropdown para seleccionar el tipo de documento */}
                <Dropdown name={"documento"} label={"Tipo de documento"} data={dataDoc} onChange={(value) => handleDropdownChange('documento', value)} />
                <Input name={"ndocumento"} texto={"Número de documento"} placeholder={"Documento del usuario"} tipo={"text"} onChange={handleInputChange} value={values.ndocumento} />
                <Input name={"direccion"} texto={"Dirección"} placeholder={"Dirección del usuario"} tipo={"text"} onChange={handleInputChange} value={values.direccion} />
                <Input name={"comuna"} texto={"Comuna"} placeholder={"Comuna del usuario"} tipo={"text"} onChange={handleInputChange} value={values.comuna} />
                <Input name={"correo"} texto={"Correo"} placeholder={"Correo electrónico del usuario"} tipo={"text"} onChange={handleInputChange} value={values.correo} />
                {/* Dropdown para seleccionar el sexo */}
                <Dropdown name={"sexo"} label={"Sexo"} data={dataSexo} onChange={(value) => handleDropdownChange('sexo', value)} />
                {/* Renderización condicional del campo "instituto" */}
                {selectedRole !== '1' && selectedRole !== '2' ? (
                    <Input name={"instituto"} texto={"Instituto"} placeholder={"Instituto del usuario"} tipo={"text"} onChange={handleInputChange} value={values.instituto} />
                ) : (
                    <UploadFile title={"Hoja de vida"} />
                )}
                <UploadFile title={"Foto"} />
            </div>
            <div class="w-full flex justify-center">
                <Boton text="Confirmar" type="blue"/> {/* Botón para confirmar el formulario */}
            </div>
        </form>
    );
}