from rest_framework import serializers
from .models import Tipodocumento, Eps, Rh

class TiposDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipodocumento
        fields = '__all__'

class EpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eps
        fields = '__all__'

class RhSeriaizer(serializers.ModelSerializer):
    class Meta:
        model = Rh
        fields = '__all__'
