import { getDropdown } from '../../api/get'

export const dataDoc = async () => {

  let dataDrop = []
  const result = await getDropdown('tiposdocumento');

  if (result.data) {
    let arrayData = result.data.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.tipodocumento,
        "value" : value.idtipodocumento
      })
    )
  }

  return dataDrop
}


export const dataRol = async () => {

  let dataDrop = []
  const result = await getDropdown('roles');

  if (result.data) {
    let arrayData = result.data.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.rol,
        "value" : value.idrol
      })
    )
  }

  return dataDrop
}

export const dataSexo = async () => {

  let dataDrop = []
  const result = await getDropdown('sexo')

  if (result.data) {
    let arrayData = result.data.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.sexo,
        "value" : value.idsexo
      })
    )
  }

  return dataDrop
}
  

export const dataMatricula =[
  {"option" : "Matricula 1", "value" : "1"},
  {"option" : "Matricula 2", "value" : "2"},
  {"option" : "Matricula 3", "value" : "3"}
]

export const dataArea = async ()=> {

  let dataDrop = []
  const result = await getDropdown('areas');

  if (result.data) {
    let arrayData = result.data.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.nombre,
        "value" : value.idareas
      })
    )
  }

  return dataDrop
}