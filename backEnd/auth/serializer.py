from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    
    contrasena = serializers.CharField(
        error_messages={
            'required': 'La contraseña es obligatoria.',
            'blank': 'La contraseña es obligatoria.',
        }
    )

    numerodocumento = serializers.IntegerField(
        error_messages = {
            'required' : 'El numero de documento es obligatorio',
            'blank' : 'El numero de documento es obligatorio',
            'invalid' : 'El numero de documento debe un número entero'
        }
    )
    
    class Meta:
        model = Usuario
        fields = '__all__'
        #extra_kwargs = {'contrasena': {'write_only': True}} (LA CONTRASEÑA NO SEA ENVIADA)
    