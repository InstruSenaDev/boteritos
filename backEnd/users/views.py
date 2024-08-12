from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tipodocumento, Usuarios, Datosmedicos, Historiaclinica
from .serializer import UsuarioSerializer, DatosMedicosSerializer, HistoriaClinicaSerializer
from .middleware import validateIdUsuario

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
        userSerializer = UsuarioSerializer(data = request.data)
        
        if userSerializer.is_valid():
            userSerializer.save()
            return Response(
                {"message" : "Usuario creado" , "Usuario" : userSerializer.data }, 
                status=status.HTTP_200_OK
                )
        
        return Response(
            {"message" : "¡Algo ha fallado!" , "error" : userSerializer.errors}, 
            status=status.HTTP_400_BAD_REQUEST
            )

@api_view(['GET', 'PUT'])
def userOne(request, idUsuario):
    
    oneUser = Usuarios.objects.filter(idusuario = idUsuario).first()
    #Validacion por si el usaurio no se encuentra
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
        #CONDICIONAL SI EL USUARIO NO FUE ENCONTRADO
        if not oneUser:
            return Response('No se encontró el usuario', status=status.HTTP_400_BAD_REQUEST)
               
        if not oneUser.check_password(contrasena):
            return Response(
                {"message" : "Login sin exito"}, 
                status=status.HTTP_400_BAD_REQUEST
                )
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
        
@api_view(['POST', 'PUT'])
def datosMedicos(request):
    print(request.data)

    #Buscar el usuario
    idUsuario = request.data.get('idusuario')
    user = Usuarios.objects.filter(idusuario = idUsuario).first()
    #Validar que el usuario existe
    if not user: 
            return Response({"message": "No se encontró al usuario"},status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'POST':
            
        datosMedicos = DatosMedicosSerializer(data=request.data)
        
        if datosMedicos.is_valid():
           datosMedicos.save()
           return Response(
               {"message": "¡Datos medicos registrados con exito!" , "data" : datosMedicos.data},
               status=status.HTTP_201_CREATED
               ) 
        
        return Response(
            {"message" : "¡Algo ha fallado!" , "error" : datosMedicos.errors},
            status=status.HTTP_400_BAD_REQUEST
            )
    
    if request.method == 'PUT':
        dataMedicos = Datosmedicos.objects.filter(idusuario = idUsuario).first()
        data = DatosMedicosSerializer(dataMedicos, data=request.data)
        
        if data.is_valid():
            data.save()
            return Response(
                {"message": "¡Datos medicos actualizados con exito!" , "data" : data.data},
                status=status.HTTP_201_CREATED
                ) 
        
        return Response(
            {"message" : "¡Algo ha fallado!" , "error" : datosMedicos.errors},
            status=status.HTTP_400_BAD_REQUEST
            )

@api_view(['GET'])
def datosMedicosOne(request, idUsuario):
    print(idUsuario)
    #Buscar el usuario
    oneUser = Datosmedicos.objects.filter(idusuario = idUsuario).first()
    #Validar que el usuario existe
    print(oneUser)
    if not oneUser: 
            return Response(
                {"message": "No encontrado", "error" : "No se encontraron los datos medicos de este usuario"},
                status=status.HTTP_404_NOT_FOUND
                )
    
    if request.method == 'GET':
        
        datosMedicos = DatosMedicosSerializer(oneUser)
        return Response(
            {"message" : "Datos medicos encontrados" , "data" : datosMedicos.data},
            status=status.HTTP_200_OK
            )
        
@api_view(['POST', 'PUT'])       
def historiaClinica(request):
    idUsuario = request.data.get('idusuario')
    
    #Validar usuario
    validateUser = validateIdUsuario(idUsuario)
    if not validateUser['result'] :
        return Response(validateUser['message'], status = validateUser['status'])
            
    if request.method == 'POST':
        dataHistoria = HistoriaClinicaSerializer(data = request.data)
        
        if dataHistoria.is_valid():
            dataHistoria.save()
            return Response(
                {"message": "Historia Clinica creada exitosamente", "data" : dataHistoria.data},
                status=status.HTTP_201_CREATED)
            
        return Response(
            {"message" : "Creacion sin exito", "error" : dataHistoria.errors},
            status= status.HTTP_400_BAD_REQUEST
            )
    
    if request.method == 'PUT':
        historiaClinica = Historiaclinica.objects.filter(idusuario = idUsuario).first()
        data = HistoriaClinicaSerializer(historiaClinica , data = request.data)
        
        if data.is_valid():
           data.save()
           return Response(
               {"message": "Historia Clinica actualizada exitosamente", "data" : data.data},
               status=status.HTTP_201_CREATED
               )
        return Response(
            {"message" : "Historia clinica actualizada sin exito" , "error" : data.errors },
            status= status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
def historiaClinicaOne(request, idUsuario):
    
    user = validateIdUsuario(idUsuario)
    
    if not user['result'] :
        return Response(user['message'], status = user['status'])
    
    historiaClinica = Historiaclinica.objects.filter(idusuario = idUsuario).first()
    
    if not historiaClinica:
        return Response(
            {"message" : "No se encuentra" , "error" : "Historia Clinica del usuario no encontrada"},
            status= status.HTTP_404_NOT_FOUND
        )
        
    if request.method == 'GET' : 
        historiaClinicaSeria = HistoriaClinicaSerializer(historiaClinica)
        return Response (
            {"message" : "Historia Clinica encontrada" , "data" : historiaClinicaSeria.data},
            status= status.HTTP_200_OK
        )