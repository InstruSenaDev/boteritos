import { fetchFunction } from "./fetch";

export const putModales = async (body, url) => {
  const data = await fetchFunction("PUT", body, null,  `registro/${url}`);
  return data;
};
