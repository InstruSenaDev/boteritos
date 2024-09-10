from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serialzer.estudianteSerializer import EstudianteSerializer
from ..models import Estudiante
from ..querySql import querySql

class EstudianteViewSets(viewsets.ModelViewSet):
    
    serializer_class = EstudianteSerializer
    queryset = Estudiante.objects.all()
    
    def create(self, request):
        serializer = self.serializer_class(data = request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "¡Estudiante creado con exito!",
                "data" : serializer.data
            }, status=status.HTTP_201_CREATED)
            
        return Response({
            "message" : "Creacion cancelada",
            "error" : serializer.errors
        }, status= status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
def EstudianteTableAdmin(request):
    if request.method == "GET":
        query = querySql("SELECT `estudiante`.`idEstudiante`, `usuario`.`nombre`,`usuario`.`apellido`, `diagnostico`.`diagnostico` FROM `estudiante` LEFT JOIN `usuario` ON `estudiante`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `historiaclinica` ON `historiaclinica`.`idEstudiante` = `estudiante`.`idEstudiante` LEFT JOIN `condicion` ON `condicion`.`idHistoriaClinica` = `historiaclinica`.`idHistoriaClinica` LEFT JOIN `diagnostico` ON `condicion`.`idDiagnostico` = `diagnostico`.`idDiagnostico`", [])
        
        return Response(query)
    
@api_view(['GET'])
def EstudianteHeaderAdmin(request,id):
    
    if request.method == "GET":
                
        query = querySql("SELECT `responsable`.`nombre` AS `nombreresponsable`,`responsable`.`apellido` AS `apellidoresponsable`, `tipoparentesco`.`tipoParentesco`, `usuario`.`nombre` AS `nombreestudiante`, `usuario`.`apellido` AS `apellidoestudiante`, `usuario`.`documento` AS `documentoestudiante`, `usuario`.`edad` AS `edadestudiante`, `usuario`.`imagen` AS `imagenestudiante` FROM `estudiante` LEFT JOIN `responsable` ON `responsable`.`idEstudiante` = `estudiante`.`idEstudiante` LEFT JOIN `tipoparentesco` ON `responsable`.`idTipoParentesco` = `tipoparentesco`.`idTipoParentesco` LEFT JOIN `usuario` ON `estudiante`.`idUsuario` = `usuario`.`idUsuario` WHERE `estudiante`.`idEstudiante` = %s;",[id])
        
        if len(query) == 0:
            return Response({
                "message" : "Consulta realizada",
                "error" : "Datos vacios"
            },status=status.HTTP_204_NO_CONTENT)
            
        infoEstudiante = query[0]
        
        #Logica para obtener obtener unicamente la informacion de los responsables del estudiante
        arrayResponsable = []
        for keysSql in query:
            objVacio = {}
            for values in keysSql:                
                if not "estudiante" in values:
                    objVacio[values] = keysSql[values]
                
            arrayResponsable.append(objVacio)
        
        dataHead = {
            'dataEstudiante' : {
                "nombre" : f"{infoEstudiante['nombreestudiante']} {infoEstudiante['apellidoestudiante']}",
                "imagen" : f"http://localhost:8000/media/{infoEstudiante['imagenestudiante']}",
                "documento" : f"{infoEstudiante['documentoestudiante']}",
                "edad" : f"{infoEstudiante['edadestudiante']}"
            },
            'dataResponsable' : arrayResponsable
        }
   
        return Response({
            "message" : "¡Consulta exitosa!",
            "data" : dataHead
        }, status=status.HTTP_200_OK)