from rest_framework import serializers
from ..models import Historiaclinica

class HistoriaClinicaSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Historiaclinica
        fields = '__all__'