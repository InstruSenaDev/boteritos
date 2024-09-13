export const caseHistoriaClinica = (name, value) => {
  let error;
  switch (name) {
      case "medicamentos":
          if (!value.trim()) {
              error = "El campo medicamentos es obligatorio.";
          }
          break;
      case "restricciones":
          if (!value.trim()) {
              error = "El campo restricciones alimenticias es obligatorio.";
          }
          break;
      case "medicamentos":
          if (!value.trim()) {
              error = "El campo medicamentos es obligatorio.";
          }
          break;
        case "archivo":
          if (!value.trim()) {
              error = "El campo archivo es obligatorio.";
          }
          break;
        case "observacion":
          if (!value.trim()) {
              error = "El campo observación es obligatorio.";
          }
          break;
      default:
          break;
  }
  return error;
};
