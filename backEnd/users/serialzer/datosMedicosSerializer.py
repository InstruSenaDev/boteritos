from rest_framework import serializers
from ..models import Datosmedicos

class DatosMedicosSerializer(serializers.ModelSerializer):
    
    #ideps = serializers.StringRelatedField()
    #idrh = serializers.StringRelatedField()
    
    class Meta: 
        model = Datosmedicos
        fields = '__all__'