from rest_framework import viewsets, status, generics
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from .models import Usuarios, Datosmedicos, Historiaclinica, Responsable

from .serialzer.datosMedicosSerializer import DatosMedicosSerializer
from .serialzer.historiaClinicaSerializer import HistoriaClinicaSerializer
from .serialzer.responsableSerializer import ResponsableSerializer
from .serialzer.usuarioSerializer import UsuarioSerializer
from .querySql import querySql
from .generalApi import  GeneralListApiView

from .middleware import validateIdUsuario


class UsuariosList(GeneralListApiView):
    serializer_class = UsuarioSerializer

class UsuariosCreate(generics.CreateAPIView):
    serializer_class = UsuarioSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            
            return Response(
                {"message" : "Usuario creado" , "data" : serializer.data }, 
                status=status.HTTP_201_CREATED
                )
            
        return Response(
            {"message" : "Creacion cancelada" , "error" : serializer.errors}, 
            status=status.HTTP_400_BAD_REQUEST
            ) 

class UsuarioUpdate(generics.UpdateAPIView):
    serializer_class = UsuarioSerializer
    
    def get_queryset(self, idUsuario = None):
        return self.get_queryset().Meta.model.objects.filter(idusuario = idUsuario)

    def put(self, request, idUsuario = None):
        if self.get_queryset(idUsuario):
            serializer = self.serializer_class(self.get_queryset(idUsuario), data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    
                )
        return 
    
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
        
        oneUser = Usuarios.objects.filter(numerodocumento = numDocumento).first()
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

@api_view(['POST', 'PUT'])
def responsable(request):
    
    idUsuario = request.data.get('idusuario')
    
    #Validar usuario
    validateUser = validateIdUsuario(idUsuario)
    if not validateUser['result'] :
        return Response(validateUser['message'], status = validateUser['status'])
    
    if request.method == 'POST':
        responsableData = ResponsableSerializer(data = request.data)
        
        if responsableData.is_valid():
            responsableData.save()
            return Response(
                {"message" : "¡Responsable creado con exito!", "data" : responsableData.data},
                status=status.HTTP_201_CREATED
            ) 
            
        return Response(
            {"message" : "Creacion sin exito", "error" : responsableData.errors},
            status= status.HTTP_400_BAD_REQUEST
            )

@api_view(['GET'])
def endPointPruebas(request):
    
    if request.method == 'GET':
        query = querySql("SELECT * FROM rh", None)
        #print(query)
        return Response(query)