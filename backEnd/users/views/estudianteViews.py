from rest_framework import viewsets, status
from rest_framework.response import Response
from ..serialzer.estudianteSerializer import EstudianteSerializer
from ..models import Estudiante

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
            })
            
        return Response({
            "message" : "Creacion cancelada",
            "error" : serializer.errors
        })