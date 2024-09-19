import { urlApi } from "../helper/urls/apiUrl";
import { fetchFunction } from "./fetch";

export const putModales = async (body, url) => {
  const data = await fetchFunction("PUT", body, null, `registro/${url}`);
  return data;
};

export const putUpdate = async (body, url, studentId) => {
  //logica de convertir el body en un formdata
  const newData = new FormData();

   // Agregar el ID del estudiante al FormData
   newData.append('idestudiante', studentId);
  //Ciclo que recorre el body y hace el append al newdata

  for (const [key, value] of Object.entries(body)) {
    newData.append(key, value);
  }

  const response = await fetch(`${urlApi}${url}`, {
    method: 'PUT',
    body: newData,
  });

  const data = await response.json();
  const result = { status: response.status, data: data };
  return result;
}