import { urlApi } from "../helper/urls/apiUrl";
import { fetchFunction } from "./fetch";

export const putModales = async (body, url) => {
  const data = await fetchFunction("PUT", body, null, `registro/${url}`);
  return data;
};


export const putUpdate = async (data, endpoint,) => {
  const response = await fetch(`${urlApi}${endpoint}`, {
    method: 'PUT',
    body: data,
  });
  return response;
};


export const putUpdateTrim = async (data, endpoint) => {
  const response = await fetch(`${urlApi}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: data, 
  });
  return response;
};


//ELIMINAR ESTUDIANTES
export const putDeleteStudents = async (body) => {
  const data = await fetchFunction("PUT", body, null, "sql/estudiantes/tabla");
  return data;
}

//ELIMINAR PROFESORES
export const putDeleteTeacher = async (body) => {
  const data = await fetchFunction("PUT", body, null, "sql/profesor/tabla");
  return data;
}
//PUT para cambiar contraseña estando logueado
export const putPassword = async (data, endpoint) => {
  const response = await fetch(`${urlApi}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: data, 
  });
  return response;
};

//put para enviar el correo de recuperación
export const putCambiarPwd = async (data, endpoint) => {
  const response = await fetch(`${urlApi}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: data, 
  });
  return response;
};

//PUT para el recuperar Contraseña
export const putRecuperarPwd = async (data, endpoint) => {
  const response = await fetch(`${urlApi}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: data, 
  });
  return response;
};

