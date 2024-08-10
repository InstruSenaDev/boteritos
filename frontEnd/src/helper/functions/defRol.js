export const defRol = (idRol) =>{
    let rol;
    switch (idRol) {
        case 1:
            rol = "admin"
            break;
        case 2:
            rol = "profesor"
            break;
        case 3:
            rol = "estudiante"
            break;
        default:
            rol = "general"
            break;
    }
    return rol
}