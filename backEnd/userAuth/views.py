import pytz
import jwt
from django.conf import settings
from datetime import datetime, timedelta
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Usuario, Profesor, Admin , Estudiante

def searchRol(idrol,idusuario):
    print('ID ROL:', idrol)
    print('ID USUARIO', idusuario)
    if idrol == 1 :
        rol = Admin.objects.filter(idusuario = idusuario).first()
        if rol :
            return rol.idadmin
        return None
        
    if idrol == 2:
        rol = Profesor.objects.filter(idusuario = idusuario).first()
        
        if rol :
            return rol.idprofesor
        return None

    if idrol == 3 :
        rol = Estudiante.objects.filter(idusuario = idusuario).first()
        
        if rol:
            return rol.idestudiante
        return None
    
    else:
        return None

@api_view(['POST'])
def Login(request):
    
    if request.method == 'POST':
        
        documento = request.data['documento']
        contrasena = request.data['contrasena']
        
        if (not documento) or (not contrasena):
            return Response({
                "message" : "Ingreso cancelado",
                "error" : "Todos los campos son necesarios"
            },status=status.HTTP_400_BAD_REQUEST)
        #Obtener data del usuario
        usuario = Usuario.objects.filter(documento = documento).first()
        print(usuario)
        if not usuario:
            #Usuario no encontrado
            return Response({
                "message" : "Ingreso cancelado",
                "error" : "Documento o contraseña incorrectos"
            },status= status.HTTP_400_BAD_REQUEST)
        
        if not usuario.check_password(contrasena):
            #Documento no coincide con la contraseña
            return Response({
                "message" : "Ingreso cancelado",
                "error" : "Documento o contraseña no coinciden"
            })   
        
        rol = searchRol(usuario.idrol, usuario.idusuario)
        
        if not rol:
            return Response({
                "message" : "Ingreso cancelado",
                "error" : "El rol no corresponde al usuario"
            },status=status.HTTP_401_UNAUTHORIZED)
        
        utc_now = datetime.now(pytz.utc)
        
        #Creacion de token de acceso
        access_payload = {
            'idusuario': usuario.idusuario ,
            'nombre': usuario.nombre ,
            'apellido' : usuario.apellido,
            'rol' : usuario.idrol,
            'idwork' : rol,
            'img' : f'http://localhost:8000/media/{usuario.imagen}',
            'exp': utc_now + timedelta(seconds=settings.JWT_ACCESS_EXPIRATION_TIME),
            'iat': utc_now
        }
        access_token = jwt.encode(access_payload, settings.JWT_ACCESS_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
        
        #Creacion de token de refresco
        refresh_payload = {
            'idusuario': usuario.idusuario ,
            'nombre': usuario.nombre ,
            'apellido' : usuario.apellido,
            'rol' : usuario.idrol,
            'idwork' : rol,
            'img' : f'http://localhost:8000/media/{usuario.imagen}',
            'exp': utc_now + timedelta(seconds=settings.JWT_REFRESH_EXPIRATION_TIME),
            'iat': utc_now
        }
        refresh_token = jwt.encode(refresh_payload, settings.JWT_REFRESH_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
        
        return Response({
            "message" : "¡Ingreso con exito!",
            "data": {    
                "access_token" : access_token,
                "refresh_token" : refresh_token
            }
        },status= status.HTTP_202_ACCEPTED)
