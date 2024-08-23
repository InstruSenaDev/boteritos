import { Input } from "../components/forms/Input.jsx";
import { Boton } from "../components/forms/Boton.jsx";
import React, { useState } from 'react';
import { postLogin } from "../api/post.js";
import { defRol } from "../helper/functions/defRol.js";

export const FormLogin = () => {

    // Estado para almacenar los valores de los inputs
    const [values, setValues] = useState({
        numerodocumento: "",
        contrasena: "",
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
    const handleFormLoginSubmit = async (event) => {
        event.preventDefault();
        console.log("Inputs value:", values); // Mostrar los valores de los inputs en la consola
        let dataUser = {...values}

        const response = await postLogin(dataUser, 'login')

        if (response.status != 200) {
            return 
        }
        //Establecemos datos en el localeStorage
        localStorage.setItem('dataUser', JSON.stringify(response.data.data))
        localStorage.setItem('token' , JSON.stringify(response.data.token))
        //Obtencion de datos de la URL para la creacion de la redireccion
        let rol = response.data.data.idrol
        let url = window.location.href
        //Redireccionamos a la vista principal segun el rol
        window.location.href = `${url}${defRol(rol.toString())}`

    }

    return (
        <main className="w-full h-screen flex justify-center items-center p-4 text-black">
            <form onSubmit={handleFormLoginSubmit} className="bg-white md:p-20 p-7 flex gap-20 rounded-xl shadow-[0_0_20px_0px_rgba(94,175,232,0.5)]">
                <div className="flex flex-col gap-7 max-w-[400px] w-full">
                    <h1 className="text-title font-cocogooseRegular tracking-widest text-darkBlue">
                        Inicio de sesión
                    </h1>
                    <Input texto="Número de documento" placeholder="Ingresa tu documento" name="numerodocumento" tipo="text" onChange={handleInputChange} value={values.numerodocumento} />
                    <Input texto="Contraseña" placeholder="Ingresa tu contraseña" name="contrasena" tipo="password" onChange={handleInputChange} value={values.contrasena} />
                    <div className="flex flex-col lg:flex-row justify-between gap-y-2">
                        <div className="space-x-2">
                            <input type="checkbox" id="recordar" className="rounded-full" />
                            <label htmlFor="recordar" className="text-paragraph2 font-cocogooseLight">
                                Ver contraseña
                            </label>
                        </div>
                        <a className="text-paragraph2 font-cocogooseLight text-darkBlue">¿Olvidaste tu contraseña?</a>
                    </div>
                    <Boton text="Iniciar Sesión" type="blue" />
                </div>
                <div className="max-h-96 max-w-[520px] w-full md:block hidden">
                    <img
                        src="../../../public/img/imgLogin.png"
                        alt=""
                        className="object-contain w-full h-full"
                        slot="imagen"
                    />
                </div>
            </form>
        </main>
    );
}