import { caseHistoriaClinica } from "./case/historiaClinica";
import { caseCondicionMedica } from "./case/condicionMedica"
import { caseTelefono } from "./case/Telefono";
import { caseResponsable } from "./case/responsable"

export const modales = (content, name, value) => {
    let error;

    switch (content) {

        case 1:
            error = caseTelefono(name, value);
            break;

        case 2:
            error = caseResponsable(name, value);
            break;

        case 3:
            error = caseCondicionMedica(name, value);
            break;

        case 4:
            error = caseHistoriaClinica(name, value);
            break;

        default:
            error = "ERROR en validacion de registro en Front-End";
            break;
    }

    return error;
}


