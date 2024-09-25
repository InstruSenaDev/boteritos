from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import Profesor

from ..serialzer.profesorSerializer import ProfesorSerializer
from ..serialzer.usuarioSerializer import UsuarioSerializer
from ..serialzer.fechasSerizalizer import FechasSerializer
from ..serialzer.direccionSerializer import DireccionSerializer
from ..serialzer.datosMedicosSerializer import DatosMedicosSerializer
from ..serialzer.fechasSerizalizer import FechasSerializer
from ..serialzer.telefonosSerializer import TelefonosSerializer
from ..querySql import querySql
from url import urlHost

@api_view(['POST', 'PUT'])
def ProfesorCreateView(request):
    
    if request.method == 'POST':
        datos = request.data
                
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
        #GUARDAMOS FECHAS
        serializerFechas.save()
        
        #----------DIRECCION----------
        direccionSerializer = DireccionSerializer(data = datos)
        if not direccionSerializer.is_valid():
            return Response({
                "message" : "Insert en direccion cancelado",
                "error" : direccionSerializer.errors
            },status=status.HTTP_400_BAD_REQUEST)
        
        #GUARDAMOS DIRECCION
        direccionSerializer.save()
        
        #----------DATOS MEDICOS----------
        datosMedicosSerializer = DatosMedicosSerializer(data = datos)
        if not datosMedicosSerializer.is_valid():
            return Response({
                "message" : "Insert en datos medicos cancelado",
                "error" : datosMedicosSerializer.errors
            },status=status.HTTP_400_BAD_REQUEST)
        
        datosMedicosSerializer.save()
        
        #----------TELEFONOS----------
        telefonoSerializer = TelefonosSerializer(data = datos)
        if not telefonoSerializer.is_valid():
            return Response({
                "message" : "Insert en telefonos cancelado",
                "error" : telefonoSerializer.errors
            },status=status.HTTP_400_BAD_REQUEST) 
        telefonoSerializer.save()
        
        #----------PROFESOR----------
        profesorSerializer = ProfesorSerializer(data = datos)
        if not profesorSerializer.is_valid():
            return Response({
                "message" : "Insert en tabla profesor cancelada",
                "error" : profesorSerializer.errors
            }, status= status.HTTP_400_BAD_REQUEST)
        profesorSerializer.save()  
             
        return Response({
            "usuario" : serializerUsuario.data,
            "fechas" : serializerFechas.data,
            "direccion" : direccionSerializer.data,
            "datosMedicos" : datosMedicosSerializer.data,
            "telefono" : telefonoSerializer.data,
            "profesor" : profesorSerializer.data
        }, status=status.HTTP_201_CREATED)
    
    if request.method == 'PUT':
        
        idProf = request.data.get('idestudiante')
        
        if not idProf:
            return Response({
                "message" : "Actualizacion cancelada",
                "error" : "El id del estudiante es obligatorio"
            },status=status.HTTP_400_BAD_REQUEST)
            
        data = request.data
        #CONSULTA CON ORM QUE ME PERMITE REALIZAR UN JOIIN ENTRE LA TABLA ESTUDIANTES Y USUARIOS
        queryProf = Profesor.objects.select_related('idusuario').filter(idprofesor=idProf).first()
        #VALIDAMOS QUE SE ENCUENTRE EL ESTUDIANTE
        if not queryProf : 
            return Response({
                "message" : "Actualizacion cancelada",
                "error" : "Profesor no encontrado"
            }, status=status.HTTP_404_NOT_FOUND)
        
        #OBTENEMOS EL ID DEL USUARIO PARA CONTINUAR CON LA ACTUALIZACION
        idUsuario = queryProf.idusuario.idusuario
        
        #ASIGNAMOS EL ID DEL USUARIO YA QUE ES UN DATO NECESARIO PARA REALIZAR LA ACTUALIZACION
        data['idusuario'] = idUsuario
         
        srProf = ProfesorSerializer(queryProf, data = data)
        #VALIDACION
        if not srProf.is_valid():
            return Response({
                "message" : "Actualizacion cancelada",
                "error" : srProf.errors
            },status=status.HTTP_400_BAD_REQUEST)
        
        queryUsuario = Profesor.objects.filter(idusuario = idUsuario).first()
        
        srUsuario = UsuarioSerializer(queryUsuario, data = data, partial = True)
        
        if not srUsuario.is_valid():
            return Response({
                "message" : "Actualizacion cancelada",
                "error" : srUsuario.errors
            })
        #INSERCION DE DATOS EN AMBAS TABLAS
        srProf.save()
        srUsuario.save()
        
        return Response({
            "message" : "Actualizacion realizada con exito",
            "data" : {
                "usuario" : srUsuario.data,
                "profesor" : srProf.data
            }
        },status=status.HTTP_201_CREATED)

@api_view(['GET'])
def ProfesorTable(request):
    if request.method == 'GET':
        query = querySql("SELECT `profesor`.`idProfesor`, CONCAT(`usuario`.`nombre`, ' ', `usuario`.`apellido` ) AS `nombre` , `profesor`.`titulo`, `areas`.`area` FROM `profesor` LEFT JOIN `areas` ON `profesor`.`idArea` = `areas`.`idArea` LEFT JOIN `usuario` ON `profesor`.`idUsuario` = `usuario`.`idUsuario`", [])
        
        if len(query) == 0:
            return Response({
                "message" : "Datos vacios",
                "error" : "No se encontraron profesores"
            },status=status.HTTP_404_NOT_FOUND)
        
        return Response({
            "message" : "Profesores encontrados",
            "data" : query
        },status=status.HTTP_200_OK)
        
@api_view(['GET'])
def ProfesorHead(request, id):
    
    if request.method == 'GET':
        query = querySql("SELECT `profesor`.`idProfesor`, CONCAT(`usuario`.`nombre`, ' ', `usuario`.`apellido` ) AS `nombre` ,`usuario`.`imagen`, `usuario`.`documento`, `usuario`.`edad` ,`profesor`.`titulo`, `areas`.`area` FROM `profesor` LEFT JOIN `areas` ON `profesor`.`idArea` = `areas`.`idArea` LEFT JOIN `usuario` ON `profesor`.`idUsuario` = `usuario`.`idUsuario` WHERE `profesor`.`idProfesor` = %s;", [id])
        
        if len(query) == 0:
            return Response({
                "message" : "Datos vacios",
                "error" : "No se encontro el profesor"
            },status=status.HTTP_404_NOT_FOUND)
        
        data = query[0]
        
        data['imagen'] = f"{urlHost}{data['imagen']}"
        
        return Response({
            "message" : "Profesores encontrados",
            "data" : data
        },status=status.HTTP_200_OK)

@api_view(['GET'])
def ProfesorDataPersonal(request,id):
    
    if request.method == 'GET':
        
        query = querySql("SELECT `profesor`.*, `areas`.*, `usuario`.`nombre`,`usuario`.`apellido`, `usuario`.`correo`, `usuario`.`documento`, `usuario`.`edad`, `usuario`.`idSexo`, `usuario`.`idTipoDocumento` , `sexo`.`sexo`, `tipodocumento`.`tipoDocumento` FROM `profesor` LEFT JOIN `areas` ON `profesor`.`idArea` = `areas`.`idArea` LEFT JOIN `usuario` ON `profesor`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `sexo` ON `usuario`.`idSexo` = `sexo`.`idSexo` LEFT JOIN `tipodocumento` ON `usuario`.`idTipoDocumento` = `tipodocumento`.`idTipoDocumento` WHERE `profesor`.`idProfesor` = %s;",[id])
        
        if len(query) == 0:
            return Response({
                "message" : "Datos vacios",
                "error" : "Datos no existen"
            },status=status.HTTP_404_NOT_FOUND)
        
        data = query[0]
        
        data['hojavida'] = f"{urlHost}{data['hojavida']}"
        
        return Response({
            "message" : "Consulta realizada con exito",
            "data" : data
        },status=status.HTTP_200_OK)
    