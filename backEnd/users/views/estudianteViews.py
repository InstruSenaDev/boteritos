from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..serialzer.estudianteSerializer import EstudianteSerializer
from ..serialzer.usuarioSerializer import UsuarioSerializer
from ..serialzer.fechasSerizalizer import FechasSerializer
from ..serialzer.direccionSerializer import DireccionSerializer
from ..serialzer.datosMedicosSerializer import DatosMedicosSerializer
from ..serialzer.telefonosSerializer import TelefonosSerializer

from ..models import Estudiante
from ..querySql import querySql


@api_view(['POST'])
def EstudianteCreateView(request):
    
    if request.method == 'POST':
        datos = request.data
        #2223456789
        
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


@api_view(['GET'])
def EstudianteDataPersonal(request,id):
    if request.method == 'GET':
        query = querySql("SELECT `usuario`.`nombre`, `usuario`.`apellido`,`usuario`.`correo`, `usuario`.`documento`, `usuario`.`edad`, `estudiante`.`tallaCamisa`, `estudiante`.`institutoProcedencia`,`sexo`.`sexo`, `matriculas`.`matricula` FROM `usuario` LEFT JOIN `estudiante` ON `estudiante`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `sexo` ON `usuario`.`idSexo` = `sexo`.`idSexo` LEFT JOIN `matriculas` ON `estudiante`.`idMatricula` = `matriculas`.`idMatricula` WHERE `estudiante`.`idEstudiante` = %s;", [id])
        
        return Response({
            "message" : "Datos encontrados",
            "datos" : query
        })

@api_view(['GET'])
def EstudianteTableAdmin(request):
    if request.method == "GET":
        query = querySql("SELECT `idUsuario`, `idEstudiante`, `nombre`, `apellido`, `diagnostico` FROM ( SELECT `usuario`.`idUsuario`, `estudiante`.`idEstudiante`, `usuario`.`nombre`, `usuario`.`apellido`, `diagnostico`.`diagnostico` AS `diagnostico`, ROW_NUMBER() OVER (PARTITION BY `usuario`.`idUsuario` ORDER BY `usuario`.`idUsuario`) AS row_num FROM `estudiante` LEFT JOIN `usuario` ON `estudiante`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `historiaclinica` ON `historiaclinica`.`idEstudiante` = `estudiante`.`idEstudiante` LEFT JOIN `condicion` ON `condicion`.`idHistoriaClinica` = `historiaclinica`.`idHistoriaClinica` LEFT JOIN `diagnostico` ON `condicion`.`idDiagnostico` = `diagnostico`.`idDiagnostico` ) AS subquery WHERE row_num = 1;", [])
        
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
        
