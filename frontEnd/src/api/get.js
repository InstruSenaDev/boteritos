import { fetchFunction } from "./fetch"

//const fetchFunction = async (method, body, header, url)

export const getAllUser = async (url) =>{
    const allUser = await fetchFunction('GET', null , null, url)

    return allUser
}
