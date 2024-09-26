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

//PUT PARA CAMBIAR EL ESTADO DE LOGRO A 0
export const putEstadoCero = async (url) => {
  const data = await fetchFunction("PUT", body, null, `logros/${url}`);
  return data;
}

