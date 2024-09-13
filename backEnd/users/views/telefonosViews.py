from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import Telefonos
from ..serialzer.telefonosSerializer import TelefonosSerializer
from ..querySql import querySql

@api_view(['GET'])
def TelefonosEstudiante(request,id):
    
    if request.method == 'GET':
        query = querySql("SELECT `usuario`.`idUsuario`, `estudiante`.`idEstudiante`, `telefonos`.`telefono1`, `telefonos`.`telefono2` FROM `usuario` LEFT JOIN `estudiante` ON `estudiante`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `telefonos` ON `telefonos`.`idUsuario` = `usuario`.`idUsuario` WHERE `usuario`.`idUsuario` = %s AND (`telefonos`.`telefono1` != NULL AND `telefonos`.`telefono2` != NULL);", [id])
        
        if len(query) == 0:
            return Response({
                "message" : "Datos no encontrados",
                "error" : "Datos vacios"
            }, status=status.HTTP_404_NOT_FOUND)
        
        return Response({
            "message" : "Datos encontrados",
            "data" : query
        }, status=status.HTTP_200_OK)
        