from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Personas, Tipodocumento
from .serializer import PersonasSerializer, TipoDocumentoSerializer, UsuarioSerializer

# Create your views here.
#CONSULTAS

@api_view(['GET','POST'])
def user(request):
    
    #request es un objeto que contiene muchos atributos, uno de esos es method, que me retorna
    #el metodo http que se utilizó en la peticion
    if request.method == 'GET':
        query = Personas.objects.all()
        querySerializer = PersonasSerializer(query,many = True)
        return Response(querySerializer.data,status=status.HTTP_200_OK) 
    
    if request.method == 'POST':
        querySerializer = PersonasSerializer(data= request.data)
        
        if querySerializer.is_valid():
            querySerializer.save() #INSERT A PERSONAS
            #OBTENEMOS LA DATA QUE SE GUARDÓ Y ACCEDEMOS A SU ID PARA HACER EL 
            #INSERT EN USUARIOS
            userData = querySerializer.data
            userDataObj = {
                'contrasena' : userData.get('numerodocumento'),
                'cambiocontrasena' : '0',
                'estado' : '1',
                'idpersona' : userData.get('idpersona'),
                'idrol' : request.data['idRol']
            }
            newUser = UsuarioSerializer(data=userDataObj)
            
            if newUser.is_valid():
                newUser.save()  
                      
                return Response({"persona":querySerializer.data, "usuario" : newUser.data }, status=status.HTTP_201_CREATED)
            
            return Response(newUser.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(querySerializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def userOne(request, idPersona):
    
    oneUser = Personas.objects.filter(idpersona = idPersona).first()
    #Validacion por si la persona no se encuentra
    if not oneUser:
        return Response({'message' : 'No se encontró el usuario'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
            
        oneUserSerializer = PersonasSerializer(oneUser)
        return Response(oneUserSerializer.data, status=status.HTTP_200_OK)

    if request.method == 'PUT':
                
        oneUserSerializer = PersonasSerializer(oneUser, data= request.data)
        #
        if oneUserSerializer.is_valid():
            oneUserSerializer.save()
            return Response(oneUserSerializer.data, status=status.HTTP_201_CREATED)
        
        return Response(oneUserSerializer.errors)