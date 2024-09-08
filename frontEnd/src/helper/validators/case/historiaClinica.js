export const caseHistoriaClinica = (name, value) => {
  let error;
  switch (name) {
      case "diagnostico":
          if (!value.trim()) {
              error = "El campo diagnóstico es obligatorio.";
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
      default:
          break;
  }
  return error;
};
