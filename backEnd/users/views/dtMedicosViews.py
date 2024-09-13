from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import Datosmedicos
from ..serialzer.datosMedicosSerializer import DatosMedicosSerializer
from ..querySql import querySql

@api_view(['GET'])
def DatosMedicosEstudianteOne(request,id):
    if request.method == 'GET':
        query = querySql("SELECT `datosmedicos`.`idDatosMedicos`, `estudiante`.`idEstudiante`, `datosmedicos`.`lugarAtencion`,`datosmedicos`.`peso`,`datosmedicos`.`altura`,`rh`.`rh`, `eps`.`eps` FROM `usuario` LEFT JOIN `estudiante` ON `estudiante`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `datosmedicos` ON `datosmedicos`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `rh` ON `datosmedicos`.`idRh` = `rh`.`idRh` LEFT JOIN `eps` ON `datosmedicos`.`idEps` = `eps`.`idEps` WHERE `estudiante`.`idUsuario` = `usuario`.`idUsuario` AND `estudiante`.`idEstudiante` = %s;",[id])
        
        if len(query) == 0:
            return Response({
                "message" : "Datos vacios",
                "error" : "Datos no encontrados"
            }, status=status.HTTP_404_NOT_FOUND)
        
        return Response({
            "message" : "¡Datos encontrados!",
            "data" : query
        }, status=status.HTTP_200_OK)

@api_view(['POST', 'PUT'])
def DatosMedicosCreateEstudiante(request):
    pass


"""
class DatosMedicosViewSet(viewsets.ModelViewSet):
    serializer_class = DatosMedicosSerializer
    queryset = Datosmedicos.objects.all()
    
    def create(self, request):
        serializer = self.serializer_class(data = request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "¡Datos medicos creados con exito!",
                "data" : serializer.data
            }, status=status.HTTP_201_CREATED)
            
        return Response({
            "message" : "Creacion cancelada",
            "error" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, pk):
        try:
            instance = self.get_queryset().get(pk=pk)
            
        except Datosmedicos.DoesNotExist:
            return Response({
                "message" : "Actualizacion cancelada", 
                "error" : "¡Datos medicos no encontrados!"
            }, status= status.HTTP_400_BAD_REQUEST)
        
                # Creamos el serializer con la instancia y los nuevos datos
        serializer = self.serializer_class(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "¡Actualización exitosa!",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        
        return Response({
            "message": "Actualización cancelada", "error": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
"""
        
    