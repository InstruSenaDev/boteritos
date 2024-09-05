from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .serializer import UsuarioSerializer
# Create your views here.
@api_view(['POST'])
def login (request):
    
    if request.method == 'POST':
        #VALIDACIONES
        if not request.data.get('numerodocumento'):
            return Response(
                {
                "message":'Login sin exito' , 
                "error" : {
                     "numerodocumento" : ["El documento es obligatorio."]
                     }
                 }, 
                status=status.HTTP_400_BAD_REQUEST)
            
        if not request.data.get('contrasena'):
            return Response(
                {
                "message":'Login sin exito' , 
                "error" : {
                     "contrasena" : ["La contraseña es obligatoria."]
                     }
                 }, 
                status=status.HTTP_400_BAD_REQUEST)
        
        numDocumento = request.data.get('numerodocumento')
        contrasena = request.data.get('contrasena')
        
        oneUser = Usuario.objects.filter(numerodocumento = numDocumento).first()
        #CONDICIONAL SI EL USUARIO NO FUE ENCONTRADO
        if not oneUser:
            return Response(
                {
                "message":'Login sin exito' , 
                "error" : {
                     "numerodocumento" : ["Usuario y contraseña no coinciden"],
                     "contrasena" : ["Usuario y contraseña no coinciden"]
                     }
                 }, 
                status=status.HTTP_400_BAD_REQUEST)
               
        if not oneUser.check_password(contrasena):
            return Response(
                {
                "message":'Login sin exito' , 
                "error" : {
                     "numerodocumento" : ["Usuario y contraseña no coinciden"],
                     "contrasena" : ["Usuario y contraseña no coinciden"]
                     }
                }, 
                status=status.HTTP_400_BAD_REQUEST)
        #SE RESUME LA INFORMACION PARA QUE EL FRONTEND NO RECIBA TODOS LOS DATOS DEL USUARIO
        dataUser = UsuarioSerializer(oneUser)
        
        dataUserClean = {
            "idUsuario" : dataUser.data.get('idusuario'),
            "nombre" : dataUser.data.get('nombre'),
            "urlImg" : dataUser.data.get('urlimg'),
            "idrol" : dataUser.data.get('idrol')
        }
        
        return Response(
            {"message": "Login con exito" , "data" : dataUserClean, "token" : "aqui debe ir mi token"}, 
            status=status.HTTP_200_OK
            )