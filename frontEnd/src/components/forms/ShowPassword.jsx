import React from 'react'

export function ShowPassword() {
    return (
        <>
            <div class="flex gap-3">
                <input type="checkbox" id="activar" />
                <label for="activar" class="text-paragraph2 font-cocogooseLight text-black relative" >Mostrar contraseña</label>
            </div>
        </>
    )
}

