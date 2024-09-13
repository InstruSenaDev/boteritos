from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from datetime import date
from .serializers.trimestreSerializer import TrimestreSerializer
from .serializers.logrosSerializer import LogrosSerializer, CalificarSerializer
from .models import Logros, Estudiante,Logroestudiante
from helper.querySql import querySql

@api_view(['POST', 'GET'])
def TrimestresView(request):
    
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


@api_view(['GET', 'POST', 'PUT'])
def LogrosViews(request):
    
    if request.method == 'GET':
        query = Logros.objects.all()
        
        if len(query) == 0:
            return Response({
                "message" : "Datos vacios"
            }, status=status.HTTP_204_NO_CONTENT)
        
        serializer = LogrosSerializer(query, many = True)
        
        return Response({
            "message" : "¡Consulta exitosa!",
            "data" : serializer.data
        },status=status.HTTP_200_OK)
        
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
        
        if not query:
            return Response({
                "messsage" : "Datos vacios",
                "error" : "No se encontró el logro"
            },status=status.HTTP_404_NOT_FOUND)
        
        serializer = LogrosSerializer(query, data = request.data)
        
        #VALIDACIONES
        if serializer.is_valid():
            serializer.save()
            
            #SI EL ESTADO ES 1 SIGNIFICA QUE EL LOGRO FUE ACEPTADO, POR LO TANTO ES NECESARIO REALIZAR LOS INSERT EN LA TABLA LOGROESTUDIANTE PARA REALIZAR LA RESPECTIVAS CALIFICACIONES
            if str(serializer.data['estado']) == "1":
                getAllEstudiantes = Estudiante.objects.all()
                
                nuevos_logros_estudiantes = []
                
                # Iterar sobre los estudiantes y crear las entradas
                for estudiante in getAllEstudiantes:
                    nuevo_logro_estudiante = Logroestudiante(
                        resultado='L.P',  # Ajusta según lo que necesitas guardar
                        fecha=date.today(),  # Usa la fecha actual
                        idlogro=query,   # Relacionar con el logro actualizado
                        idestudiante=estudiante  # Relacionar con cada estudiante
                    )
                    nuevos_logros_estudiantes.append(nuevo_logro_estudiante)
                
                # Insertar todas las instancias de Logroestudiante de una sola vez
                Logroestudiante.objects.bulk_create(nuevos_logros_estudiantes)
                
            
            return Response({
                "message" : "¡Actualizacion realizada con exito!",
                "data" : serializer.data
            })
        #data = DatosMedicosSerializer(dataMedicos, data=request.data)
        
        return Response('PUT')
    
    
@api_view(['GET'])
def ListLogros(request):

    if request.method == 'GET':
        query = querySql("SELECT `logros`.`idLogro` AS `idlogro` ,`logros`.`logro`, `tipologro`.`tipoLogro`, `profesor`.`titulo`, CONCAT(`usuario`.`nombre`, ' ', `usuario`.`apellido`) AS `nombre`, `profesor`.`idProfesor` FROM `logros` LEFT JOIN `tipologro` ON `logros`.`idTipoLogro` = `tipologro`.`idTipoLogro` LEFT JOIN `profesor` ON `logros`.`idProfesor` = `profesor`.`idProfesor` LEFT JOIN `usuario` ON `profesor`.`idUsuario` = `usuario`.`idUsuario`;",[])
        
        return Response(query)
    

@api_view(['GET', 'PUT'])
def Calificar(request,id):
    
    if request.method == 'GET':
        getLogros = Logros.objects.filter(idprofesor = id)
        
        
        # Obtener los IDs de los logros creados por el profesor
        logros_ids = getLogros.values_list('idlogro', flat=True)
        
        # Filtrar los Logroestudiante que están relacionados con los logros creados por el profesor
        query = Logroestudiante.objects.filter(idlogro__in=logros_ids)
        
        # Serializar los datos
        serializer = CalificarSerializer(query, many=True)
        
        return Response(serializer.data)