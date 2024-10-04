import React, { useContext, createContext, useEffect, useState } from "react";
import { authToken } from "../api/post";
import Loading from "../components/loaders/loading";

//Contexto
const AuthContext = createContext({
    isLogin: false,
    rol: null
});

export const AuthProvider = ({children}) =>{
    //OBTENER EL ROL DEL LOCAL STORAGE
    const [rol , setRol] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    
    const [verificacionCompleta, setVerificacionCompleta] = useState(false);
    
    useEffect(()=>{

        const obtenerRol = async ()=>{
    
            try {
                console.log('AAAAAAAAAAAAAAAAAAAAAAAAA');
                
                //OBTENEMOS EL TOKEN
                const tokenUser = JSON.parse(localStorage.getItem("access_token"));
                console.log(tokenUser);

                
                //!Validamos si no existe el token en el localeStorage para definir el rol de visitante sin login
                
                if (!tokenUser) {
                    setRol('notLogin');
                    setVerificacionCompleta(true);
                    return
                }

                //*Hacemos la consulta a la DB para verificar si ese token es de nosotros (valida la contraseña del token)
                const data = authToken({"token" : tokenUser}, 'token/')
                
                console.log(data);
                
                /*
                const response = await rolState.json();
                //! Si la validacion con el token retorna algun error

                if (response.statuscode === 400) {
                    //* Enviarlo a un componente diferente
                    setRol('notLogin');
                    setIsLogin(false);
                    setVerificacionCompleta(true);
                    return
                }
                const dataUser = await response.body.infoEnviar;

                //* Asignar el tipo de rol 
                if (dataUser.id_rol == 1) {
                    setRol('loginAdmin');
                    setIsLogin(true);

                }else if (dataUser.id_rol == 2) {
                    setRol('loginUser');
                    setIsLogin(true);
                }
                */
                setVerificacionCompleta(true);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerRol();
    },[]);
    
    return(

        <AuthContext.Provider value={{ rol, isLogin }}> 
            { verificacionCompleta ? children : <Loading /> }
        </AuthContext.Provider>
    )
}

//* useAuth retorno todas las funcionalidades y valores de context AuthContext, es decir, que useAuth es todo eso de arriba
export const useAuth = () => useContext(AuthContext);