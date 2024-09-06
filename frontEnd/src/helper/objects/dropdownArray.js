import { getDropdown } from '../../api/get'

export const dataDoc = async () => {

  let dataDrop = []
  const result = await getDropdown('dropdowns/tiposdocumento');

  if (result.data) {
    let arrayData = result.data
  
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
  const result = await getDropdown('dropdowns/roles');
  
  if (result.data) {
    let arrayData = result.data
  
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
  const result = await getDropdown('dropdowns/sexo')

  if (result.data) {
    
    let arrayData = result.data
  
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
  const result = await getDropdown('dropdowns/areas');

  if (result.data) {
    let arrayData = result.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.nombre,
        "value" : value.idareas
      })
    )
  }

  return dataDrop
}

export const dataEps = async () =>{

  let dataDrop = []
  const result = await getDropdown('dropdowns/eps');

  if (result.data) {
    let arrayData = result.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.nombre,
        "value" : value.idareas
      })
    )
  }

  return dataDrop
}

export const dataTipoParentesco = async () =>{

  let dataDrop = []
  const result = await getDropdown('dropdowns/sexo');

  if (result.data) {
    let arrayData = result.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.parentesco,
        "value" : value.idtipoparentesco
      })
    )
  }

  return dataDrop
}