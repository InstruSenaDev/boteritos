import { urlApi } from "../helper/urls/apiUrl";

export const fetchFunction = async (method, body, header, url) =>{

    let dataBody = !body ? null : JSON.stringify(body)

    const response = await fetch(`${urlApi}${url}`, {
        method: method,
        body : dataBody,
        headers :{
            "Content-Type": "application/json"
        }
    })

    
    const data = await response.json()
    const result = {status: response.status, data : data }
    return result
}