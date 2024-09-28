import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation  } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { AutorizarVista } from "./AutorizarVista";

const RutaProtegida = () => {
    // Lógica para determinar las rutas accesibles según el rol
    const rutaActual = useLocation().pathname;
    
    const [ accesRol, setAcces ] = useState('')
    const [ rol, setRol ] = useState('')

    console.log(rutaActual);
    
    let esRutaAccesible = false;

    useEffect(()=>{
        const getRol =async ()=>{
            //LLAMAMOS A LA FUNCION QUE VALIDA EL TOKEN Y DESTRUCTURAMOS
            const [ acces, rolU ] = await AutorizarVista();

            setAcces(acces)
            setRol(rolU)
        }
        getRol()
    },[])

    console.log(accesRol)

    switch (accesRol) {
        case 'notLogin':
            esRutaAccesible = ['/', '/ayudacontrasena' , '/recuperarcontrasena'].includes(rutaActual)
            break;

        case 'loginAdmin':    
            esRutaAccesible = rutaActual.includes('admin');
            break;

        case 'loginProf':
            esRutaAccesible = rutaActual.includes('profesor');
            break;

        case 'loginEstud':
            esRutaAccesible = rutaActual.includes('estudiante');
            break;

        default:
            break;
    }
    console.log(esRutaAccesible)
    return (
        esRutaAccesible ?  <Outlet /> : accesRol == 'notLogin' ? <Navigate to={'/'} /> : <Navigate to={`/${rol}`} />
    )
}

export default RutaProtegida