import { fetchFunction, fetchFunctionFiles } from "./fetch";

//const fetchFunction = async (method, body, header, url)

export const postUserStudent = async (body, url) => {
  const data = await fetchFunction("POST", body, null, url);
  return data;
};

export const postLogin = async (body, url) => {
  const data = await fetchFunction("POST", body, null, url);
  return data;
};

export const postModales = async (body, url) => {
  const data = await fetchFunction("POST", body, null, `registro/${url}`);
  return data;
};

export const postTrimestres = async (body, url) => {
  const data = await fetchFunction("POST", body, null, `logros/${url}`);
  return data;
}

export const authToken = async (body, url) => {
  const data = await fetchFunction("POST", body, null, `auth/${url}`);
  return data;
}