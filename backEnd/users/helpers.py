tiposDocumento = {
    "1" : {
        "min" : 8,
        "max" : 10
    },
    "2" : {
        "min" : 8,
        "max" : 8
    }
}

def validateCantDocumento(numero, tipo):
    numeroLength = len(str(numero))
    min = tiposDocumento[tipo]["min"]
    max = tiposDocumento[tipo]["max"]

    if not (numeroLength >= min and numeroLength <= max):
        return {
            "error" : f"Numero de documento debe tener como minimo {min} y maximo {max} digitos" , 
            "result" : False
            }
    
    return {"result" : True}