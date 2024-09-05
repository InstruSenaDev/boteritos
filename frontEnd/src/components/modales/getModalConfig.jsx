//Configuración para la cantidad de columnas que se mostraran en los modales
import { defaultValues } from "../../helper/modales/objectsModal";

export const getModalConfig = (contentType) => {
  let initialValues = {};
  let columns = 1;

  switch (contentType) {
    case "Telefono":
      initialValues = defaultValues.telefono;
      columns = 1;
      break;
    case "Responsable":
      initialValues = defaultValues.responsable;
      columns = 2;
      break;
    case "Condicion Medica":
      initialValues = defaultValues.condicionmedica;
      columns = 1;
      break;
    case "Historia Clinica":
      initialValues = defaultValues.historiaclinica;
      columns = 1;
      break;
    case "Informes":
      initialValues = {}; 
      columns = 1;
      break;
    default:
      initialValues = {};
      columns = 1;
  }

  return { initialValues, columns };
};
