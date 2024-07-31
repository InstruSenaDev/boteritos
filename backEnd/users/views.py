from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tipodocumento, Usuarios
from .serializer import TipoDocumentoSerializer, UsuarioSerializer

# Create your views here.
#CONSULTAS

@api_view(['GET','POST'])
def user(request):
    #request es un objeto que contiene muchos atributos, uno de esos es method, que me retorna
    #el metodo http que se utilizó en la peticion
    
    #OBTENER TODOS LOS USUARIOS
    if request.method == 'GET':
        user = Usuarios.objects.all()
        userSerializer = UsuarioSerializer(user, many = True)
        return Response(userSerializer.data,status=status.HTTP_200_OK) 
    
    #Crear Persona y Usuario
    if request.method == 'POST':
        userSerializer = UsuarioSerializer(data= request.data)
        
        if userSerializer.is_valid():
            userSerializer.save()
            return Response(
                {"message" : "Usuario creado" , "Usuario" : userSerializer.data }, 
                status=status.HTTP_200_OK
                )
        
        return Response(userSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def userOne(request, idUsuario):
    
    oneUser = Usuarios.objects.filter(idusuario = idUsuario).first()
    #Validacion por si la persona no se encuentra
    if not oneUser:
        return Response({'message' : 'No se encontró el usuario'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
            
        oneUserSerializer = UsuarioSerializer(oneUser)
        return Response(oneUserSerializer.data, status=status.HTTP_200_OK)

    if request.method == 'PUT':
                
        oneUserSerializer = UsuarioSerializer(oneUser, data= request.data)
        if oneUserSerializer.is_valid():
            oneUserSerializer.save()
            return Response(oneUserSerializer.data, status=status.HTTP_201_CREATED)
        
        return Response(oneUserSerializer.errors)

@api_view(['POST'])
def login (request):
    
    if request.method == 'POST':
        #DATOS RECIBIDOS
        numDocumento = request.data.get('numerodocumento')
        contrasena = request.data.get('contrasena')
        
        oneUser = Usuarios.objects.filter(numerodocumento = numDocumento).first()
        
        if not oneUser:
            return Response('No se encontró el usuario', status=status.HTTP_400_BAD_REQUEST)
               
        if not oneUser.check_password(contrasena):
            return Response(
                {"message" : "Login sin exito"}, 
                status=status.HTTP_400_BAD_REQUEST
                )

        return Response(
            {"message": "Login con exito" , "Token" : "aqui debe ir mi token"}, 
            status=status.HTTP_200_OK
            )