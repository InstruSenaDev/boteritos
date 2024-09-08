from rest_framework import viewsets, status
from rest_framework.response import Response

from ..models import Fechas
from ..serialzer.fechasSerizalizer import  FechasSerializer

class FechasViewSet(viewsets.ModelViewSet):
    serializer_class = FechasSerializer
    queryset = Fechas.objects.all()
    
    def create(self, request):
        serializer = self.serializer_class(data = request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Fechas creadas con exito!",
                "data" : serializer.data
            }, status=status.HTTP_201_CREATED)
            
        return Response({
            "message" : "Creacion cancelada",
            "error" : serializer.errors
        }, status= status.HTTP_400_BAD_REQUEST)