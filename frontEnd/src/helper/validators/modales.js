import { caseHistoriaClinica } from "./case/historiaClinica";
import { caseCondicionMedica } from "./case/condicionMedica";
import { caseTelefono } from "./case/Telefono";
import { caseResponsable } from "./case/responsable";

export const modales = (content, name, value) => {
    let error;
    console.log(`Validando: Content=${content}, Name=${name}, Value=${value}`); // Añadido

    switch (content) {
        case "Telefono":
            error = caseTelefono(name, value);
            break;
        case "Responsable":
            error = caseResponsable(name, value);
            break;
        case "Condicion Medica":
            error = caseCondicionMedica(name, value);
            break;
        case "Historia Clinica":
            error = caseHistoriaClinica(name, value);
            break;
        default:
            console.error(`Tipo de contenido no soportado: ${content}`); // Añadido para depuración
            error = "ERROR en validacion de registro en Front-End";
            break;
    }

    return error;
};
