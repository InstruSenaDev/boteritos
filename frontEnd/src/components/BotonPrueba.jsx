import { useState } from "react"

const BotonPrueba = () => {
    const [contador, setContador] = useState(0);
    
    const aumentar = ()=>{
        setContador(contador + 1);
    }

    return (
        <>
            <p className="text-xl">{contador}</p>
            <button onClick={aumentar}>CLICK</button>
        </>
    )
}

export default BotonPrueba