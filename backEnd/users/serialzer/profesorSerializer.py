from rest_framework import serializers
from ..models import Profesor

class ProfesorSerializer(serializers.ModelSerializer):
    
    #idarea = serializers.StringRelatedField()
    
    class Meta:
        model = Profesor
        fields = '__all__'