from rest_framework import serializers
from .models import Tipodocumento, Usuarios

class UsuarioSerializer(serializers.ModelSerializer):
    
    comuna = serializers.CharField(
        error_messages={
            'required': 'La comuna es obligatoria.'
        }
    )
    barrio = serializers.CharField(
        error_messages={
            'required': 'El barrio es obligatorio.'
        }
    )
    correo = serializers.EmailField(
        error_messages={
            'required': 'El correo es obligatorio.',
            'invalid': 'El correo debe ser una dirección válida.'
        }
    )
    urlimg = serializers.URLField(
        error_messages={
            'required': 'La URL de la imagen es obligatoria.',
            'invalid': 'La URL de la imagen debe ser válida.'
        }
    )
    fecharegistro = serializers.DateField(
        error_messages={
            'required': 'La fecha de registro es obligatoria.',
            'invalid': 'La fecha de registro debe ser una fecha válida.'
        }
    )
    fechaingreso = serializers.DateField(
        error_messages={
            'required': 'La fecha de ingreso es obligatoria.',
            'invalid': 'La fecha de ingreso debe ser una fecha válida.'
        }
    )
    fechanacimiento = serializers.DateField(
        error_messages={
            'required': 'La fecha de nacimiento es obligatoria.',
            'invalid': 'La fecha de nacimiento debe ser una fecha válida.'
        }
    )
    edad = serializers.IntegerField(
        error_messages={
            'required': 'La edad es obligatoria.',
            'invalid': 'La edad debe ser un número entero.'
        }
    )
    institutoprocedencia = serializers.CharField(
        error_messages={
            'required': 'El instituto de procedencia es obligatorio.'
        }
    )
    direccion = serializers.CharField(
        error_messages={
            'required': 'La dirección es obligatoria.'
        }
    )
    idtipodocumento = serializers.IntegerField(
        error_messages={
            'required': 'El tipo de documento es obligatorio.',
            'invalid': 'El tipo de documento debe ser un número entero.'
        }
    )
    idsexo = serializers.IntegerField(
        error_messages={
            'required': 'El sexo es obligatorio.',
            'invalid': 'El sexo debe ser un número entero.'
        }
    )
    contrasena = serializers.CharField(
        min_length=8,
        error_messages={
            'required': 'La contraseña es obligatoria.',
            'min_length': 'La contraseña debe tener al menos 8 caracteres.'
        }
    )
    cambiocontrasena = serializers.CharField(
        error_messages={
            'required': 'El campo de cambio de contraseña es obligatorio.'
        }
    )
    estado = serializers.CharField(
        error_messages={
            'required': 'El estado es obligatorio.'
        }
    )
    idrol = serializers.IntegerField(
        error_messages={
            'required': 'El rol es obligatorio.',
            'invalid': 'El rol debe ser un número entero.'
        }
    )
    
    class Meta:
        model = Usuarios
        fields = '__all__'
        #extra_kwargs = {'contrasena': {'write_only': True}} (LA CONTRASEÑA NO SEA ENVIADA)
    
    def create(self, validated_data):
        usuario = Usuarios(**validated_data)
        usuario.set_password(validated_data['contrasena'])
        usuario.save()
        
        return usuario
    
    def update(self, instance, validated_data):
        
        if 'contrasena' in validated_data:
            instance.set_password(validated_data['contrasena'])
            validated_data.pop('contrasena', None)
            
        return super().update(instance, validated_data)


class TipoDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Tipodocumento
        fields= '__all__'
        