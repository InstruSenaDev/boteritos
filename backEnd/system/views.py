from rest_framework import viewsets
from .models import Personas, Tipodocumento
from .serializer import PersonasSerializer, TipoDocumentoSerializer

# Create your views here.
#CONSULTAS

class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Personas.objects.all()
    serializer_class = PersonasSerializer
    
    
class TipoDocumentoViewSet(viewsets.ModelViewSet):
    queryset = Tipodocumento.objects.all()
    serializer_class = TipoDocumentoSerializer