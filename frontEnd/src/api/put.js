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

