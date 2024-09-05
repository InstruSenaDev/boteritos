from rest_framework import status, viewsets
from rest_framework.response import Response

from ..models import Datosmedicos
from ..serialzer.datosMedicosSerializer import DatosMedicosSerializer

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
            })
    