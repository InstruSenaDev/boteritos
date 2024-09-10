import { fetchFunction } from "./fetch"

//const fetchFunction = async (method, body, header, url)

export const getAllUser = async (url) =>{
    const allUser = await fetchFunction('GET', null , null, url)
    return allUser
}

export const getOneUser = async(url) =>{
    const oneUser = await fetchFunction('GET', null , null, url)
    return oneUser
}

export const getDropdown = async (url) =>{
    const data = await fetchFunction('GET', null, null, url)
    return data
}
