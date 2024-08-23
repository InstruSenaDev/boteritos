from rest_framework import serializers
from ..models import Datosmedicos

class DatosMedicosSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Datosmedicos
        fields = '__all__'