from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.decorators import api_view
from django.template.loader import get_template
from rest_framework import status
from datetime import date
from weasyprint import HTML

from ..serializers.logrosSerializer import LogrosSerializer, CalificarSerializer, InformesSerializer
from ..models import Logros, Estudiante, Logroestudiante, Trimestres
from helper.querySql import querySql
from url import urlHost

#NOMBRE DEL ESTUDIANTE, TRIMESTRE, FECHA DE CREACION
def namePdf(estud,trim,fecha):
    #CONVERTIMOS EL NOMBRE EN UN ARRAY
    nombreArray = estud['nombre'].lower().split()
    nombre = '_'.join(nombreArray)#SEPARARLO CON UN CARACTER EN ESPECIFICO => _
    
    return f"{nombre}_{trim.trimestre}_{fecha}"

#ID DEL ESTUDIANTE, INFO DEL TRIMESTRE, OBSERVACION
def generarInforme(idEstudiante, idTrim, observacion, fecha):
    #DECLARACION DE VARIABLES
    template = get_template("informe.html") #PLANITLLA HTML
    
    #VARIABLES QUE NOS AYUDARAN CON EL MANEJOS DE LOS DATOS PARA LOS LOGROS
    calificaciones = [ [], [], [], [], [], [] ] #ALMACENAMIENTO DE LOGRO POR AREA
    areas = ['Socio - Afectiva', 'Vida diaria', 'Teatro', 'Danza', 'Música', 'Pintura']
    
    #BUSCAMOS LA INFORMACION DEL TRIMESTRE
    trim = Trimestres.objects.filter(idtrimestre = idTrim).first()
    
    if not trim:
        return Response({
            "message" : "Creacion del informe cancelada",
            "error" : "El trimestre no existe"
        },status=status.HTTP_404_NOT_FOUND) 
    
    #BUSCAMOS LA INFORMACION DEL ESTUDIANTE
    queryEstud = querySql("SELECT CONCAT(`usuario`.`nombre`, ' ' ,`usuario`.`apellido`) AS `nombre`, `usuario`.`documento`, `usuario`.`edad`, `usuario`.`imagen`, `diagnostico`.`diagnostico` FROM `estudiante` LEFT JOIN `usuario` ON `estudiante`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `historiaclinica` ON `historiaclinica`.`idEstudiante` = `estudiante`.`idEstudiante` LEFT JOIN `condicion` ON `condicion`.`idHistoriaClinica` = `historiaclinica`.`idHistoriaClinica` LEFT JOIN `diagnostico` ON `condicion`.`idDiagnostico` = `diagnostico`.`idDiagnostico` WHERE `estudiante`.`idEstudiante` = %s;" , [idEstudiante])
    
    #VALIDAMOS QUE EL ESTUDIANTE EXISTA
    if len(queryEstud) == 0:
        return Response({
            "message" : "Creacion del informe cancelada",
            "error" : "Estudiante no existe"
        },status=status.HTTP_404_NOT_FOUND)
    
    #MODIFICAR LA URL DE LA IMAGEN PARA SEA FUNCIONAL
    dataEstud = queryEstud[0]
    urlImg = dataEstud.get('imagen')
    
    #ASIGNAR IMAGEN PREDETERMINADA SI NO SE ENCUENTRA
    if not urlImg :
        dataEstud['imagen'] = f'{urlHost}imagenes/studentDefault.png'

    #DEFINIR LA URL DE LA IMAGEN DEL ESTUDIANTE
    dataEstud['imagen'] = f'{urlHost}{urlImg}'
    
    for i in range(0,6):
        #AGREGAMOS UN +1 YA QUE LAS AREAS EMPIEZAN DESDE 1
        idArea = i + 1
        #CONSULTA PARA OBTENER LOS LOGROS
        calificaciones[i] = querySql("SELECT `areas`.`area`, `profesor`.`idProfesor`, `logros`.`idLogro`,`logros`.`logro`, `logros`.`idTrimestre`, `logroestudiante`.* FROM `areas` LEFT JOIN `profesor` ON `profesor`.`idArea` = `areas`.`idArea` LEFT JOIN `logros` ON `logros`.`idProfesor` = `profesor`.`idProfesor` LEFT JOIN `logroestudiante` ON `logroestudiante`.`idLogro` = `logros`.`idLogro` WHERE (`areas`.`idArea` = %s AND `logroestudiante`.`idEstudiante` = %s AND `logros`.`idTrimestre` = %s AND (`logroestudiante`.`estado` = 1));",[idArea,idEstudiante,idTrim])
    
    combinados = list(zip(areas, calificaciones))
    
    #CREACION DEL PDF
    html_template = template.render(context = {
        "combinados" : combinados, 
        "estudiante" : dataEstud, 
        "observacion" : observacion,
        "tematica" : trim.descripcion
        })
    
    textFile = namePdf(dataEstud, trim, fecha)    
    pdf = HTML(string=html_template).write_pdf()
    
    return pdf, textFile
    

#TRIMESTRE, AREA, ID ESTUDIANTE, (CONDICION QUE SEA ESTADO = 1)
@api_view(['GET'])
def InformeList(request,idtrim,idarea,idestud):
    
    if request.method == 'GET':
        
        query = querySql("SELECT `areas`.`area`, `profesor`.`idProfesor`, `logros`.`idLogro`,`logros`.`logro`, `logros`.`idTrimestre`, `logroestudiante`.* FROM `areas` LEFT JOIN `profesor` ON `profesor`.`idArea` = `areas`.`idArea` LEFT JOIN `logros` ON `logros`.`idProfesor` = `profesor`.`idProfesor` LEFT JOIN `logroestudiante` ON `logroestudiante`.`idLogro` = `logros`.`idLogro` WHERE (`areas`.`idArea` = %s AND `logroestudiante`.`idEstudiante` = %s AND `logros`.`idTrimestre` = %s AND (`logroestudiante`.`estado` = 1));",[idarea,idestud,idtrim])
        
        if len(query) == 0:
            return Response({
                "message" : "Calificaciones vacias",
                "error" : "El profesor no ha enviado las calificacione de este estudiante"
            },status=status.HTTP_404_NOT_FOUND)
        
        return Response(query)
    
@api_view(['POST'])
def CreateInforme(request):
    if request.method == 'POST':
        
        #OBTENCION Y VALIDACION DE DATOS RECIBIDOS
        observacion = request.data.get('observacion')
        idTrim = request.data.get('idtrimestre')
        idEstudiante = request.data.get('idestudiante')
        #OBTENCION DE LA FECHA EN LA CUAL SE ESTA CREANDO EL INFORME
        fecha = date.today()
        
        if not observacion:
            return Response({
                "message" : "Creacion del informe cancelada",
                "error" : "La observacion es obligatoria"
            },status=status.HTTP_400_BAD_REQUEST)
        
        if not idTrim or (not str(idTrim).isdigit()):
            return Response({
                "message" : "Creacion del informe cancelada",
                "error" : "El id del trimestre es obligatorio"
            },status=status.HTTP_400_BAD_REQUEST)
        
        if not idEstudiante or (not str(idEstudiante).isdigit()):
            return Response({
                "message" : "Creacion del informe cancelada",
                "error" : "el id del estudiante es obligatorio"
            },status=status.HTTP_400_BAD_REQUEST)
        
        
        pdf, textFile = generarInforme(idEstudiante, idTrim, observacion, fecha)
        
        dataInforme = request.data
        dataInforme['fecha'] = fecha
        dataInforme['informe'] = textFile
        
        srInformes = InformesSerializer(data = dataInforme)
        
        if not srInformes.is_valid():
            return Response({
                "message" : "Error al crear el informe",
                "error" : srInformes.errors
            },status=status.HTTP_400_BAD_REQUEST)
        
        srInformes.save()    
        
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = f'inline; filename="{textFile}.pdf"'
        response['X-TextFile'] = textFile
        
        return response
