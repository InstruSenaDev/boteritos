from rest_framework import serializers
from .models import Personas, Tipodocumento

class PersonasSerializer(serializers.ModelSerializer):
    class Meta:
        model=Personas
        fields= '__all__'
        
class TipoDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Tipodocumento
        fields= '__all__'
        