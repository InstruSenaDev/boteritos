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