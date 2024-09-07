
import {LayoutGeneral} from "../../layouts/LayoutGeneral.jsx";
import { Boton } from "../../components/forms/Boton.jsx";
import {Input} from "../../components/forms/Input.jsx";

import React from 'react'

export const CambiarContrasena = () => {
  return (
    <LayoutGeneral title="Cambiar contraseña" titleHeader="Cambiar Contraseña">
    <main className="w-full flex items-center justify-center">
        <div className="sm:max-w-[920px] grid sm:grid-cols-[1fr_1fr] gap-10 bg-white rounded-xl py-5 px-10 ">
            <div className="flex flex-col gap-5">
                <p className="text-title2 font-Cocogoose-SemiLight">Ten en cuenta:</p>
                <ol className="list-decimal	text-paragraph font-Cocogoose-Light flex-col">
                    <li>
                        Introduce tu contraseña actual en el campo correspondiente para verificar tu identidad.</li>
                    <li>
                        Escribe tu nueva contraseña en el campo destinado para ello. 
                        Asegúrate de que la nueva contraseña sea segura y cumpla con los requisitos de seguridad.
                    </li>
    
                    <li>
                        Confirma tu nueva contraseña escribiéndola nuevamente en el campo de confirmación
                    </li>
                </ol>
            </div>
    
            <div className="flex flex-col gap-5">
                <Input texto="Contraseña actual" placeholder="Ingrese su contraseña" icon=""/>
                <Input texto="Nueva contraseña" placeholder="Ingrese nueva contraseña" icon=""/>
                <Input texto="Confirmar contraseña" placeholder="confirme nueva contraseña" icon=""/>
                <div className="flex gap-3">
                    <input type="checkbox"/>
                    <p>Mostrar contraseña</p>
                </div>
                <Boton text="Guardar" type="blue"/>
            </div>
    
        </div>
    </main>
</LayoutGeneral>
  )
}

