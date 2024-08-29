
export const caseResponsable = (name, value) => {
    let error;
    switch (name) {
        case "nombre":
            if (!value.trim()) {
                error = "El campo nombre es obligatorio"
            }
            break;
        case "documento":
            if (!value.trim()) {
                error = "El campo documento es obligatorio"
            }
            break;

        case "ndocumento":
            if (!value.trim()) {
                error = "El número de documento es obligatorio.";
            } else if (value.length < 8 || value.length > 10) {
                error = "El número de documento debe tener entre 8 y 10 dígitos.";
            } else if (isNaN(value) || value.length <= 0) {
                error = "Ingrese un documento valido.";
            }
            break;

        case "telefono":
            if (!value.trim()) {
                error = "El campo telefono es obligatorio"
            } else if (value.length < 10 || value.length > 10) {
                error = "El número de documento debe tener 10 dígitos.";}
            break;

        case "telefonodos":
            if (!value.trim()) {
                error = "El campo telefonodos es obligatorio"
            }
            break;

        case "direccion":
            if (!value.trim()) {
                error = "El campo direccion es obligatorio"
            }
            break;

        case "empresa":
            if (!value.trim()) {
                error = "El campo empresa es obligatorio"
            }
            break;

        case "parentesco":
            if (!value.trim()) {
                error = "El campo parentesco es obligatorio"
            }
            break;

        default:
            break;
    }

}


