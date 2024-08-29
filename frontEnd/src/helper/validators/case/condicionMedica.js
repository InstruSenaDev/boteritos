export const caseCondicionMedica = (name, value) => {
    let error;
    switch (name) {
        case "parentesco":
            if (!value.trim()) {
                error = "El campo es obligatorio"
            }
            break;

        case "lugaratencion":
            if (!value.trim()) {
                error = "El campo es obligatorio"
            }
            break;

        case "rh":
            if (!value.trim()) {
                error = "El campo RH es obligatorio"
            }
            break;

        case "estatura":
            if (!value.trim()) {
                error = "El campo estatura es obligatorio"
            }
            break;

        case "peso":
            if (!value.trim()) {
                error = "El campo peso es obligatorio"
            }
            break;

        default:
            break;
    }

    return error;
}

