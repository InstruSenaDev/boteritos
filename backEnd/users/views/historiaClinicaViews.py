from rest_framework import viewsets, status
from rest_framework.response import Response
from ..models import Historiaclinica
from ..serialzer.historiaClinicaSerializer import HistoriaClinicaSerializer

class HistoriaClinicaViewSets(viewsets.ModelViewSet):
    
    serializer_class = HistoriaClinicaSerializer
    queryset = Historiaclinica.objects.all()
    
    def create(self, request):
        serializer = self.serializer_class(data = request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "¡Historia clinica creada con exito!",
                "data" : serializer.data
            })
            
        return Response({
            "message" : "Creacion cancelada",
            "error" : serializer.errors
        })