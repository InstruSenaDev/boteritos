import { fetchFunction } from "./fetch"

//const fetchFunction = async (method, body, header, url)

export const postUserStudent = async (body, url) =>{

    const data = await fetchFunction('POST', body , null, url)

    return data
}