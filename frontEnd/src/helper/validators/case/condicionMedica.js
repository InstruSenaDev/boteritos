export const caseCondicionMedica = (name, value) => {
    let error;
    switch (name) {
        case "parentesco":
            if (!value.trim()) {
                error = "El campo parentesco es obligatorio.";
            }
            break;
        case "lugaratencion":
            if (!value.trim()) {
                error = "El campo lugar de atención es obligatorio.";
            }
            break;
        case "rh":
            if (!value.trim()) {
                error = "El campo RH es obligatorio.";
            }
            break;
        case "estatura":
            if (!value.trim()) {
                error = "El campo estatura es obligatorio.";
            } else if (isNaN(value)) {
                error = "El campo estatura debe ser un número.";
            }
            break;
        case "peso":
            if (!value.trim()) {
                error = "El campo peso es obligatorio.";
            } else if (isNaN(value)) {
                error = "El campo peso debe ser un número.";
            }
            break;
        default:
            break;
    }
    return error;
};
