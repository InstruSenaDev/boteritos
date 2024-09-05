import React, { useEffect } from 'react'
import { dataRol } from '../../helper/objects/dropdownArray'

export const Prueba = () => {

    useEffect(()=>{
        
        console.log('AAAAAAAAAAAAAAAAAAAAAAAA');

        const mierda = async ()=>{
            const pito = await dataRol()
            console.log(pito);
            
        }

        mierda();
    },[])
    
    
  return (
    <div>prueba</div>
  )
}