export const caseEstudiante = (name, value) =>{
    let error = "";
    switch (name) {
      case "nombre":
        if (!value.trim()) {
          error = "El nombre es obligatorio.";
        }
        break;

      case "correo":
        if (!value.trim()) {
          error = "El correo es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "El correo no es válido.";
        }
        break;

      case "apellido":
        if (!value.trim()) {
          error = "El apellido es obligatorio.";
        }
        break;

      case "comuna":
        if (!value.trim()) {
          error = "La comuna es obligatoria.";
        }
        break;

      case "matricula":
        if (!value.trim()) {
          error = "La matricula es obligatoria.";
        }
        break;

      case "fechaingreso":
        if (!value.trim()) {
          error = "La fecha de ingreso es obligatoria.";
        }
        break;

      case "direccion":
        if (!value.trim()) {
          error = "La dirección es obligatoria.";
        }
        break;

      case "institutoprocedencia":
        if (!value.trim() || value === "N/A") {
          error = "El instituto es obligatorio.";
        }
        break;

      case "idarea":
        if (!value.trim() || value === "N/A") {
          error = "Selecciona el area.";
        }
        break;

      case "barrio":
        if (!value.trim()) {
          error = "El barrio es obligatorio.";
        }
        break;
      /*
        case "fechanacimiento":
          if (!value.trim()) {
            error = "La fecha de nacimiento es obligatoria.";
          }
          break;
            */
      case "idrol":
        if (!value.trim()) {
          error = "Seleccione un rol.";
        }
        break;

      case "idtipodocumento":
        if (!value.trim()) {
          error = "Seleccione el tipo de documento.";
        }
        break;

      case "idsexo":
        if (!value.trim()) {
          error = "Seleccione el sexo.";
        }
        break;

      case "edad":
        const edad = Number(value);
        if (!value.trim()) {
          error = "La edad es obligatoria.";
        } else if (!Number.isInteger(edad) || edad <= 0) {
          error = "Ingrese una edad valida.";
        }
        break;

      case "numerodocumento":
        if (!value.trim()) {
          error = "El número de documento es obligatorio.";
        } else if (value.length < 8 || value.length > 10) {
          error = "El número de documento debe tener entre 8 y 10 dígitos.";
        } else if (isNaN(value) || value.length <= 0) {
          error = "Ingrese un documento valido.";
        }
        break;
    }
    return error;
}