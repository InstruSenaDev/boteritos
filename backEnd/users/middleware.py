from .models import Usuarios
from rest_framework.response import Response
from rest_framework import status

def validateIdUsuario(idUsuario):
    oneUser = Usuarios.objects.filter(idusuario = idUsuario).first()
    #Validar que el usuario existe
    if not oneUser:
        return {
            "result" : False,
            "message" : {"message": "No encontrado", "error" : "No se encontraron los datos medicos de este usuario"},
            "status" :  status.HTTP_404_NOT_FOUND
        }
    return {"result" : True}