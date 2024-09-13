from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import Responsable
from ..serialzer.responsableSerializer import ResponsableSerializer
from ..querySql import querySql

@api_view(['GET'])
def ResponsableOne(request, id):
    if request.method == 'GET':
        query = querySql("SELECT `responsable`.`nombre`, `responsable`.`idResponsable` , `responsable`.`apellido`, `responsable`.`correo`, `responsable`.`numeroDocumento`, `responsable`.`telefono`, `responsable`.`profesion`, `responsable`.`ocupacion`, `responsable`.`empresa`, `tipoparentesco`.`tipoParentesco`, `tipodocumento`.`tipoDocumento`, `sexo`.`sexo` FROM `responsable` LEFT JOIN `tipoparentesco` ON `responsable`.`idTipoParentesco` = `tipoparentesco`.`idTipoParentesco` LEFT JOIN `tipodocumento` ON `responsable`.`idTipoDocumento` = `tipodocumento`.`idTipoDocumento` LEFT JOIN `sexo` ON `responsable`.`idSexo` = `sexo`.`idSexo` WHERE `responsable`.`idEstudiante` = %s;", [id])
        
        if len(query) == 0:
            return Response({
                "message" : "Consulta realizada",
                "error" : "Datos no encontrados"
            },status=status.HTTP_404_NOT_FOUND)
            
        return Response({
            "message" : "Datos encontrados",
            "data" : query
        },status=status.HTTP_200_OK)


class ResponsableViewSets(viewsets.ModelViewSet):
    serializer_class = ResponsableSerializer
    queryset = Responsable.objects.all()
    
    def create(self, request):
        serializer = self.serializer_class(data = request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "¡Responsable creado con exito!",
                "data" : serializer.data
            }, status=status.HTTP_201_CREATED)
            
        return Response({
            "message" : "Creacion cancelada",
            "error" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)