from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..serialzer.estudianteSerializer import EstudianteSerializer
from ..serialzer.usuarioSerializer import UsuarioSerializer
from ..serialzer.fechasSerizalizer import FechasSerializer
from ..serialzer.direccionSerializer import DireccionSerializer
from ..serialzer.datosMedicosSerializer import DatosMedicosSerializer
from ..serialzer.fechasSerizalizer import FechasSerializer
from ..serialzer.telefonosSerializer import TelefonosSerializer

from ..models import Estudiante
from ..querySql import querySql


@api_view(['POST'])
def EstudianteCreateView(request):
    
    if request.method == 'POST':
        datos = request.data
        #2223456789
        print(request.data)
        
        #----------USUARIO----------
        serializerUsuario = UsuarioSerializer(data = datos)
        
        if not serializerUsuario.is_valid():
            return Response({
                "message" : "Creacion del usuario cancelada",
                "error" : serializerUsuario.errors
            }, status=status.HTTP_400_BAD_REQUEST)
            
        serializerUsuario.save()
        
        idUsuario = serializerUsuario.data['idusuario']
        datos['idusuario'] = idUsuario
        
        #----------FECHAS----------
        serializerFechas = FechasSerializer(data = datos)
        #VALIDAMOS FECHAS
        if not serializerFechas.is_valid():
            return Response({
                "message" : "Insert en fechas cancelado",
                "erorr" : serializerFechas.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        
        #----------DIRECCION----------
        direccionSerializer = DireccionSerializer(data = datos)
        if not direccionSerializer.is_valid():
            return Response({
                "message" : "Insert en direccion cancelado",
                "error" : direccionSerializer.errors
            },status=status.HTTP_400_BAD_REQUEST)
        
        
        
        #----------DATOS MEDICOS----------
        datosMedicosSerializer = DatosMedicosSerializer(data = datos)
        if not datosMedicosSerializer.is_valid():
            return Response({
                "message" : "Insert en datos medicos cancelado",
                "error" : datosMedicosSerializer.errors
            },status=status.HTTP_400_BAD_REQUEST)
        
        
        
        #----------TELEFONOS----------
        telefonoSerializer = TelefonosSerializer(data = datos)
        if not telefonoSerializer.is_valid():
            return Response({
                "message" : "Insert en telefonos cancelado",
                "error" : telefonoSerializer.errors
            },status=status.HTTP_400_BAD_REQUEST) 
        
        
        #----------ESTUDIANTE----------
        estudianteSerializer = EstudianteSerializer(data = datos)
        if not estudianteSerializer.is_valid():
            return Response({
                "message" : "Insert en tabla estudiante cancelada",
                "error" : estudianteSerializer.errors
            }, status= status.HTTP_400_BAD_REQUEST)
            
        #GUARDAMOS FECHAS
        serializerFechas.save()
        #GUARDAMOS DIRECCION
        direccionSerializer.save()
        datosMedicosSerializer.save()
        telefonoSerializer.save()
        estudianteSerializer.save()  
             
        return Response({
            "usuario" : serializerUsuario.data,
            "fechas" : serializerFechas.data,
            "direccion" : direccionSerializer.data,
            "datosMedicos" : datosMedicosSerializer.data,
            "telefono" : telefonoSerializer.data,
            "estudiante" : estudianteSerializer.data
        }, status=status.HTTP_201_CREATED)


class EstudianteViewSets(viewsets.ModelViewSet):
    
    serializer_class = EstudianteSerializer
    queryset = Estudiante.objects.all()
    
    def create(self, request):
        
        print(request.data)
        
        serializer = self.serializer_class(data = request.data)
        
        if serializer.is_valid():
            
            #serializer.save()
            return Response({
                "message" : "¡Estudiante creado con exito!",
                "data" : serializer.data
            }, status=status.HTTP_201_CREATED)
            
        return Response({
            "message" : "Creacion cancelada",
            "error" : serializer.errors
        }, status= status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def EstudianteTableAdmin(request):
    if request.method == "GET":
        query = querySql("SELECT `estudiante`.`idEstudiante`, `usuario`.`nombre`,`usuario`.`apellido`, `diagnostico`.`diagnostico` FROM `estudiante` LEFT JOIN `usuario` ON `estudiante`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `historiaclinica` ON `historiaclinica`.`idEstudiante` = `estudiante`.`idEstudiante` LEFT JOIN `condicion` ON `condicion`.`idHistoriaClinica` = `historiaclinica`.`idHistoriaClinica` LEFT JOIN `diagnostico` ON `condicion`.`idDiagnostico` = `diagnostico`.`idDiagnostico`", [])
        
        return Response(query)
    
@api_view(['GET'])
def EstudianteHeaderAdmin(request,id):
    
    if request.method == "GET":
                
        query = querySql("SELECT CONCAT(`responsable`.`nombre`, ' ',`responsable`.`apellido` ) AS `responsable`,`tipoparentesco`.`tipoParentesco`, CONCAT(`usuario`.`nombre` , ' ', `usuario`.`apellido`) AS `estudiante`, `usuario`.`documento` AS `documentoestudiante`, `usuario`.`edad` AS `edadestudiante`, `usuario`.`imagen` AS `imagenestudiante`, `estudiante`.`idestudiante` FROM `estudiante` LEFT JOIN `responsable` ON `responsable`.`idEstudiante` = `estudiante`.`idEstudiante` LEFT JOIN `tipoparentesco` ON `responsable`.`idTipoParentesco` = `tipoparentesco`.`idTipoParentesco` LEFT JOIN `usuario` ON `estudiante`.`idUsuario` = `usuario`.`idUsuario` WHERE `estudiante`.`idEstudiante` = %s;",[id])
        
        if len(query) == 0:
            return Response({
                "message" : "Consulta realizada",
                "error" : "Datos vacios"
            },status=status.HTTP_204_NO_CONTENT)
            
        infoEstudiante = query[0]
        
        #Logica para obtener obtener unicamente la informacion de los responsables del estudiante
        arrayResponsable = []
        for keysSql in query:
            objVacio = {}
            for values in keysSql:                
                if not "estudiante" in values:
                    objVacio[values] = keysSql[values]
                
            arrayResponsable.append(objVacio)
        
        arrayModif = []
        for values in arrayResponsable:
            objVacio = {}
            objVacio ={
                "name" : values['tipoparentesco'] ,
                "value" : values['responsable']
            }
            arrayModif.append(objVacio)
                    
        dataHead = {
            'dataEstudiante' : {
                "id" : infoEstudiante['idestudiante'],
                "nombre" : infoEstudiante['estudiante'],
                "imagen" : f"http://localhost:8000/media/{infoEstudiante['imagenestudiante']}",
                "documento" : infoEstudiante['documentoestudiante'],
                "edad" : infoEstudiante['edadestudiante']
            },
            'dataResponsable' : arrayModif
        }
   
        return Response({
            "message" : "¡Consulta exitosa!",
            "data" : dataHead
        }, status=status.HTTP_200_OK)