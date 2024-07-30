from rest_framework import serializers
from .models import Personas, Tipodocumento, Usuario

class PersonasSerializer(serializers.ModelSerializer):
    class Meta:
        model=Personas
        fields= '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {'contrasena': {'write_only': True}}
    
    def create(self, validated_data):
        
        usuario = Usuario(
            idpersona = validated_data['idpersona'],
            idrol = validated_data['idrol'],
            estado = validated_data['estado'],
            cambiocontrasena = validated_data['cambiocontrasena']
        )
        
        usuario.set_password(validated_data['contrasena'])
        usuario.save()
        print(usuario)
        
        return usuario

    #ESTUDIARLO
    """
    def update(self, instance, validated_data):
        if 'contrasena' in validated_data:
            instance.set_password(validated_data['contrasena'])
            instance.cambiocontrasena = 'False'
        instance.estado = validated_data.get('estado', instance.estado)
        instance.idpersona = validated_data.get('idpersona', instance.idpersona)
        instance.idrol = validated_data.get('idrol', instance.idrol)
        instance.save()
        return instance
    """

class TipoDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Tipodocumento
        fields= '__all__'
        