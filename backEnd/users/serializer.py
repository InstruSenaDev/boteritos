from rest_framework import serializers
from .models import  Usuarios, Datosmedicos, Historiaclinica, Responsable
from .helpers import validateCantDocumento, validateMinCaractEspecial

class UsuarioSerializer(serializers.ModelSerializer):
    
    nombre = serializers.CharField(
        error_messages={
            'required': 'El nombre es obligatorio.',
            'blank' : 'El nombre es obligatorio.'
        }
    )
    comuna = serializers.CharField(
        error_messages={
            'required': 'La comuna es obligatoria.',
            'blank' : 'La comuna es obligatorio.'
        }
    )
    barrio = serializers.CharField(
        error_messages={
            'required': 'El barrio es obligatorio.',
            'blank': 'El barrio es obligatorio.'
        }
    )
    correo = serializers.EmailField(
        error_messages={
            'required': 'El correo es obligatorio.',
            'blank': 'El barrio es obligatorio.',
            'invalid': 'El correo debe ser una dirección válida.'
        }
    )
    urlimg = serializers.URLField(
        error_messages={
            'required': 'La URL de la imagen es obligatoria.',
            'blank': 'La URL de la imagen es obligatoria.',
            'invalid': 'La URL de la imagen debe ser válida.'
        }
    )
    fecharegistro = serializers.DateField(
        error_messages={
            'required': 'La fecha de registro es obligatoria.',
            'blank': 'La fecha de registro es obligatoria.',
            'invalid': 'La fecha de registro debe ser una fecha válida.'
        }
    )
    fechaingreso = serializers.DateField(
        error_messages={
            'required': 'La fecha de ingreso es obligatoria.',
            'blank': 'La fecha de ingreso es obligatoria.',
            'invalid': 'La fecha de ingreso debe ser una fecha válida.'
        }
    )
    fechanacimiento = serializers.DateField(
        error_messages={
            'required': 'La fecha de nacimiento es obligatoria.',
            'blank': 'La fecha de nacimiento es obligatoria.',
            'invalid': 'La fecha de nacimiento debe ser una fecha válida.',
            'null' : 'La fecha de nacimiento es obligatoria.'
        }
    )
    edad = serializers.IntegerField(
        error_messages={
            'required': 'La edad es obligatoria.',
            'blank': 'La edad es obligatoria.',
            'invalid': 'La edad debe ser un número entero.'
        }
    )
    institutoprocedencia = serializers.CharField(
        error_messages={
            'required': 'El instituto de procedencia es obligatorio.',
            'blank': 'El instituto de procedencia es obligatorio.'
        }
    )
    direccion = serializers.CharField(
        error_messages={
            'required': 'La dirección es obligatoria.',
            'blank': 'La dirección es obligatoria.',
        }
    )
    idtipodocumento = serializers.IntegerField(
        error_messages={
            'required': 'El tipo de documento es obligatorio.',
            'blank': 'El tipo de documento es obligatorio.',
            'invalid': 'El tipo de documento debe ser un número entero.'
        }
    )
    idsexo = serializers.IntegerField(
        error_messages={
            'required': 'El sexo es obligatorio.',
            'blank': 'El sexo es obligatorio.',
            'invalid': 'El sexo debe ser un número entero.'
        }
    )
    contrasena = serializers.CharField(
        error_messages={
            'required': 'La contraseña es obligatoria.',
            'blank': 'La contraseña es obligatoria.',
        }
    )
    cambiocontrasena = serializers.CharField(
        error_messages={
            'required': 'El campo de cambio de contraseña es obligatorio.',
            'blank': 'El campo de cambio de contraseña es obligatorio.'
        }
    )
    estado = serializers.CharField(
        error_messages={
            'required': 'El estado es obligatorio.',
            'blank': 'El estado es obligatorio.'
        }
    )
    idrol = serializers.IntegerField(
        error_messages={
            'required': 'El rol es obligatorio.',
            'blank': 'El rol es obligatorio.',
            'invalid': 'El rol debe ser un número entero.'
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
        model = Usuarios
        fields = '__all__'
        #extra_kwargs = {'contrasena': {'write_only': True}} (LA CONTRASEÑA NO SEA ENVIADA)
    
    def validate_nombre(self, value):

        regex = validateMinCaractEspecial(value, "nombre")
        if not regex['result']:
            raise serializers.ValidationError(regex['error'])
        return value 

    def validate_numerodocumento(self, value):

        tipoDoc = str(self.initial_data.get('idtipodocumento'))
        validacion = validateCantDocumento(value, tipoDoc)
        
        if not validacion['result']:
            raise serializers.ValidationError([validacion['error']])
            
        return value
    
    #Funcion que evitará que se cree un usuario con el mismo numero de documento
    def validarNumeroDocumento(self, value):
        user = Usuarios.objects.filter(numerodocumento = value).count()
        #Si encuentra usuarios con ese numero de documento, retornará la cantidad de estos, lo que significa que ese usuario ya existe
        if user >= 1 :
            return False
        
        return True
    
    def create(self, validated_data):
        #Validacion del numero de documento
        numDocumento = validated_data.get('numerodocumento')
        validacion = self.validarNumeroDocumento(numDocumento)
        if not validacion :
            raise serializers.ValidationError(
                {
                "message" : "Creacion cancelada", 
                "error" : {
                    "numerodocumento" : ["Documento ya existe"]
                    }
                 }
                )
        
        usuario = Usuarios(**validated_data)
        usuario.set_password(validated_data['contrasena'])
        #usuario.save()
        
        return usuario
    
    def update(self, instance, validated_data):
        
        if 'contrasena' in validated_data:
            instance.set_password(validated_data['contrasena'])
            validated_data.pop('contrasena', None)
            
        return super().update(instance, validated_data)
    
class DatosMedicosSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Datosmedicos
        fields = '__all__'
        
class HistoriaClinicaSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Historiaclinica
        fields = '__all__'

class ResponsableSerializer(serializers.ModelSerializer):

    nombre = serializers.CharField(
        error_messages={
            'required': 'El nombre es obligatorio.',
            'blank' : 'El nombre es obligatorio.'
        }
    )
    
    correo = serializers.EmailField(
        error_messages={
            'required': 'El correo es obligatorio',
            'blank': 'El correo es obligatorio',
            'invalid': 'El formato del correo es inválido'
        }
    )

    numerodocumento = serializers.CharField(
        error_messages={
            'required': 'El número de documento es obligatorio',
            'blank': 'El número de documento es obligatorio',
            'invalid': 'El número de documento debe ser un valor válido'
        }
    )

    telefono = serializers.CharField(
        error_messages={
            'required': 'El teléfono es obligatorio',
            'blank': 'El teléfono es obligatorio',
            'invalid': 'El teléfono debe ser un valor válido'
        }
    )

    profesion = serializers.CharField(
        error_messages={
            'required': 'La profesión es obligatoria',
            'blank': 'La profesión es obligatoria',
            'invalid': 'La profesión debe ser un valor válido'
        }
    )

    ocupacion = serializers.CharField(
        error_messages={
            'required': 'La ocupación es obligatoria',
            'blank': 'La ocupación es obligatoria',
            'invalid': 'La ocupación debe ser un valor válido'
        }
    )

    empresa = serializers.CharField(
        error_messages={
            'required': 'La empresa es obligatoria',
            'blank': 'La empresa es obligatoria',
            'invalid': 'La empresa debe ser un valor válido'
        }
    )

    idusuario = serializers.IntegerField(
        error_messages={
            'required': 'El ID de usuario es obligatorio',
            'invalid': 'El ID de usuario debe ser un número entero válido'
        }
    )

    idtipodocumento = serializers.IntegerField(
        error_messages={
            'required': 'El ID del tipo de documento es obligatorio',
            'invalid': 'El ID del tipo de documento debe ser un número entero válido'
        }
    )
    
    idparentesco = serializers.IntegerField(
    error_messages={
        'required': 'El ID de parentesco es obligatorio',
        'invalid': 'El ID de parentesco debe ser un número entero válido'
    }
)

    class Meta:
        model = Responsable
        fields = '__all__'
    
    #Funcion que evitará que se cree un usuario con el mismo numero de documento
    def validarNumeroDocumento(self, value):
        user = Responsable.objects.filter(numerodocumento = value).count()
        #Si encuentra usuarios con ese numero de documento, retornará la cantidad de estos, lo que significa que ese usuario ya existe
        print(user)
        
        if user >= 1 :
            return False
        
        return True
    
    def validate_numerodocumento(self, value):

        tipoDoc = str(self.initial_data.get('idtipodocumento'))
        validacion = validateCantDocumento(value, tipoDoc)
        
        if not validacion['result']:
            raise serializers.ValidationError([validacion['error']])
            
        return value
    
    
    def create(self, validated_data):
        #Validacion del numero de documento
        numDocumento = validated_data.get('numerodocumento')
        validacion = self.validarNumeroDocumento(numDocumento)
        if not validacion :
            raise serializers.ValidationError(
                {
                "message" : "Creacion cancelada", 
                "error" : {
                    "numerodocumento" : ["Documento ya existe"]
                    }
                 }
                )
        
        responsable = Responsable(**validated_data)
        #responsable.save()
        
        return responsable

"""
    nombre, correo, numerodocumento, telefono ,profesion ,ocupacion ,empresa , idusuario ,idparentesco ,idtipodocumento 
"""