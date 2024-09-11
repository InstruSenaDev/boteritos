export const caseCondicionMedica = (name, value) => {
    let error;

    // Verificar si el valor es una cadena antes de aplicar trim
    const trimmedValue = typeof value === "string" ? value.trim() : value;

    switch (name) {
        case "parentesco":
            if (!trimmedValue) {
                error = "El campo parentesco es obligatorio.";
            }
            break;
        case "lugaratencion":
            if (!trimmedValue) {
                error = "El campo lugar de atención es obligatorio.";
            }
            break;
        case "rh":
            if (!trimmedValue) {
                error = "El campo RH es obligatorio.";
            }
            break;
        case "ideps":
            if (!trimmedValue) {
                error = "El campo Eps es obligatorio.";
            }
            break;
        case "estatura":
            if (!trimmedValue) {
                error = "El campo estatura es obligatorio.";
            } else if (isNaN(trimmedValue)) {
                error = "El campo estatura debe ser un número.";
            }
            break;
        case "peso":
            if (!trimmedValue) {
                error = "El campo peso es obligatorio.";
            } else if (isNaN(trimmedValue)) {
                error = "El campo peso debe ser un número.";
            }
            break;
        default:
            break;
    }
    return error;
};