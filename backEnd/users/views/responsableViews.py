from rest_framework import viewsets, status
from rest_framework.response import Response

from ..models import Responsable
from ..serialzer.responsableSerializer import ResponsableSerializer

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
            })
            
        return Response({
            "message" : "Creacion cancelada",
            "error" : serializer.errors
        })