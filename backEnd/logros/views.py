from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from datetime import date
from .serializers.trimestreSerializer import TrimestreSerializer
from .serializers.logrosSerializer import LogrosSerializer, CalificarSerializer
from .models import Logros, Estudiante, Logroestudiante, Trimestres
from helper.querySql import querySql

@api_view(['POST'])
def TrimestresCreate(request):
        
    if request.method == 'POST':
        serializer = TrimestreSerializer(data = request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "¡Trimestre creado!",
                "data" : serializer.data
            },status=status.HTTP_201_CREATED)
        
        return Response({
            "message" : "Creacion del trimestre cancelada",
            "error" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def TrimestresList(request,fecha):
    if request.method == 'GET':
        
        query = Trimestres.objects.filter(fechainicio__year = fecha)
        
        if not query :
            return Response({ 
                "message" : "Trimestres no encontrados",
                "error" : "No hay trimestres registrados en el año actual"
            }, status=status.HTTP_404_NOT_FOUND)
            
        srTrimestres = TrimestreSerializer(query, many = True)
    
        return Response({
            "message" : "Trimestres encontrados",
            "data" : srTrimestres.data
        },status=status.HTTP_200_OK)
        
    

@api_view(['POST', 'PUT'])
def LogrosViews(request):

    #CUANDO LO CREA EL PROFESOR
    if request.method == 'POST':        
        serializer = LogrosSerializer(data = request.data)
    
        if serializer.is_valid():
            serializer.save()
            
            return Response({
                "message" : "¡Logro creado con exito!",
                "data" : serializer.data
            },status=status.HTTP_201_CREATED)
        
        return Response({
            "message" : "¡Creacion del logro cancelada!",
            "error" : serializer.errors
        })
    
    #CUANDO LO RECIBE EL ADMINISTRADOR
    if request.method == 'PUT':
        id = request.data['idlogro']
        query = Logros.objects.filter(idlogro = id).first()
        
        print(query)
        
        if not query:
            return Response({
                "messsage" : "Datos vacios",
                "error" : "No se encontró el logro"
            },status=status.HTTP_404_NOT_FOUND)
        
        serializer = LogrosSerializer(query, data = request.data)
                
        #VALIDACIONES
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            #SI EL ESTADO ES 1 SIGNIFICA QUE EL LOGRO FUE ACEPTADO, POR LO TANTO ES NECESARIO REALIZAR LOS INSERT EN LA TABLA LOGROESTUDIANTE PARA REALIZAR LA RESPECTIVAS CALIFICACIONES
            if str(serializer.data['estado']) == "1":
                getAllEstudiantes = Estudiante.objects.all()
                
                nuevos_logros_estudiantes = []
                
                # Iterar sobre los estudiantes y crear las entradas
                for estudiante in getAllEstudiantes:
                    nuevo_logro_estudiante = Logroestudiante(
                        resultado='2',  # Ajusta según lo que necesitas guardar
                        fecha=date.today(),  # Usa la fecha actual
                        idlogro=query,   # Relacionar con el logro actualizado
                        idestudiante=estudiante,  # Relacionar con cada estudiante
                        estado = '0' #Definir el estado inicial (GUARDADO)
                    )
                    nuevos_logros_estudiantes.append(nuevo_logro_estudiante)
                
                # Insertar todas las instancias de Logroestudiante de una sola vez
                calificaciones = Logroestudiante.objects.bulk_create(nuevos_logros_estudiantes)

                srCalificacion = CalificarSerializer(calificaciones, many = True)
                
                return Response({
                    "message" : "¡Aceptacion de logro realizada con exito!",
                    "data" : srCalificacion.data
                },status=status.HTTP_201_CREATED)     
            
        return Response({
            "message" : "Aceptacion de logros cancelada",
            "data" : serializer.errors
        },status=status.HTTP_400_BAD_REQUEST)

#PARA ADMIN VER TODOS LOS LOGROS CREADOS
@api_view(['GET'])
def ListLogrosAdmin(request,idtrim):

    if request.method == 'GET':
        
        query = querySql("SELECT `logros`.*, `tipologro`.`tipoLogro`, `trimestres`.`trimestre`, `profesor`.*, `areas`.`area`, CONCAT(`usuario`.`nombre`, ' ', `usuario`.`apellido`) AS `nombre` FROM `logros` LEFT JOIN `tipologro` ON `logros`.`idTipoLogro` = `tipologro`.`idTipoLogro` LEFT JOIN `trimestres` ON `logros`.`idTrimestre` = `trimestres`.`idTrimestre` LEFT JOIN `profesor` ON `logros`.`idProfesor` = `profesor`.`idProfesor` LEFT JOIN `areas` ON `profesor`.`idArea` = `areas`.`idArea` LEFT JOIN `usuario` ON `profesor`.`idUsuario` = `usuario`.`idUsuario` WHERE `trimestres`.`idTrimestre` = %s;",[idtrim])
        
        print(query)
        
        if len(query) == 0 :
            return Response({
                "message" : "Datos vacios",
                "error" :  ""    
            },status=status.HTTP_404_NOT_FOUND)
            
        return Response({
            "message" : "Logros encontrados",
            "data" : query
        },status=status.HTTP_200_OK)
    
#VISTA PARA LOS PROFESORES, PARA VER LOS LOGROS CREADOS POR ELLOS MISMOS    
@api_view(['GET'])
def ListLogrosProfesor(request, idtrim, idprof):
    
    if request.method == 'GET':
        query = Logros.objects.filter(idtrimestre = idtrim, idprofesor = idprof)
        
        if len(query) == 0:
            return Response({
                "message" : "Datos vacios",
                "error" : "No hay logros creados en este trimestre"
            }, status=status.HTTP_204_NO_CONTENT)
        
        serializer = LogrosSerializer(query, many = True)
        
        return Response({
            "message" : "¡Consulta exitosa!",
            "data" : serializer.data
        },status=status.HTTP_200_OK)
        
#LOGROS YA APROBADOS LISTOS PARA QUE SEAN CALIFICADOS
@api_view(['GET', 'PUT'])
def Calificar(request,idtrim,idprof,idestud):
    
    if request.method == 'GET':
        getLogros = Logros.objects.filter(idprofesor = idprof, idtrimestre = idtrim)
        
        # Obtener los IDs de los logros creados por el profesor
        logros_ids = getLogros.values_list('idlogro', flat=True)
        
        # Filtrar los Logroestudiante que están relacionados con los logros creados por el profesor
        query = Logroestudiante.objects.filter(idlogro__in=logros_ids, idestudiante = idestud)
        
        # Serializar los datos
        serializer = CalificarSerializer(query, many=True)
        
        return Response(serializer.data)
    
    if request.method == 'PUT':
        print()
        pass