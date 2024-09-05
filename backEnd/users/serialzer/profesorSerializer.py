from rest_framework import serializers
from ..models import Profesor,Areas

class ProfesorSerializer(serializers.ModelSerializer):
    
    # Para mostrar los nombres de las relaciones
    idarea_display = serializers.StringRelatedField(source='idarea', read_only=True)
    
    # Para aceptar IDs en solicitudes POST y PUT
    idarea = serializers.PrimaryKeyRelatedField(queryset=Areas.objects.all())
    
    class Meta:
        model = Profesor
        fields = ['idprofesor' , 'titulo', 'hojavida', 'idusuario' , 'idarea', 'idarea_display']