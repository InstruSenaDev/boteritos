export const caseLogros = (name, value) => {
  let error;
  switch (name) {
    case "idtipologro":
      if (!value.trim()) {
        error = "Seleccione un tipo de logro";
      }
      break;
    case "logro":
        if (!value.trim()) {
            error = "El nombre del logro es obligatorio"
        }
        break;
  };
  return error;
};
