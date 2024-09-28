import { authToken } from "../api/post";

export const AutorizarVista = async () => {

    const tokenUser = JSON.parse(localStorage.getItem("access_token"));
    console.log(tokenUser);
    if (!tokenUser) {
        setRol('notLogin');
        setVerificacionCompleta(true);
        return
    }

    //VALIDAMOS TOKEN
    const data = await authToken({"token" : tokenUser}, 'token/')

    if(data.status != 200){
        return 'notLogin'
    }

    //OBTENEMOS EL ROL
    const rol = data.data.data
    console.log(rol);
    
    switch (rol) {
        case 1:
            return ['loginAdmin', 'admin']
        case 2:
            return ['loginProf', 'profesor']
        case 3:
            return ['loginEstud', 'estudiante']
        default:
            return ['notLogin']
    }
   
}
