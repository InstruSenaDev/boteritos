import { fetchFunction } from "./fetch";

//const fetchFunction = async (method, body, header, url)

export const getAllUser = async (url) => {
  const allUser = await fetchFunction("GET", null, null, url);
  return allUser;
};

export const getOneUser = async (url) => {
  const oneUser = await fetchFunction("GET", null, null, url);
  return oneUser;
};

export const getDropdown = async (url) => {
  const data = await fetchFunction("GET", null, null, url);
  return data;
};

//http://localhost:8000/api/v3/usuarios/historiaclinica/?idestudiante=2
export const dataDetailEstudiante = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const dataResponsableEstudiante = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const dataDatosMedicosEstudiante = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const dataContactosEstudiante = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const DataDireccionesEstudiante = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const DataPersonal = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};
