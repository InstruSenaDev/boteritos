from rest_framework import status, viewsets
from rest_framework.response import Response

from ..models import Profesor
from ..serialzer.profesorSerializer import ProfesorSerializer

class ProfesorViewSets(viewsets.ModelViewSet):
    serializer_class = ProfesorSerializer
    queryset = Profesor.objects.all()
    
    def create(self, request):
        serializer = self.serializer_class(data = request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "¡Profesor creado con exito!",
                "data" : serializer.data
            }, status=status.HTTP_201_CREATED)
            
        return Response({
            "message" : "Creacion cancelada",
            "error" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)