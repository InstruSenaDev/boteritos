from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Personas, Tipodocumento
from .serializer import PersonasSerializer, TipoDocumentoSerializer

# Create your views here.
#CONSULTAS

@api_view(['POST'])
def registerUser(request):
    print("Hola Mundo")
    return Response({}) 


class PersonaViewSet(viewsets.ModelViewSet):
    #queryset = Personas.objects.filter(comuna='5')
    queryset = Personas.objects.all()
    serializer_class = PersonasSerializer
    
    
class TipoDocumentoViewSet(viewsets.ModelViewSet):
    queryset = Tipodocumento.objects.all()
    serializer_class = TipoDocumentoSerializer