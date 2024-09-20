from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.template.loader import get_template
from rest_framework import status
from datetime import date
from weasyprint import HTML
from .objPrueba import logrosInforme

from ..serializers.logrosSerializer import LogrosSerializer, CalificarSerializer
from ..models import Logros, Estudiante, Logroestudiante, Trimestres
from helper.querySql import querySql

#TRIMESTRE, AREA, ID ESTUDIANTE, (CONDICION QUE SEA ESTADO = 1)
@api_view(['GET'])
def InformeList(request,idtrim,idarea,idestud):
    
    if request.method == 'GET':
        
        query = querySql("SELECT `areas`.`area`, `profesor`.`idProfesor`, `logros`.`idLogro`,`logros`.`logro`, `logros`.`idTrimestre`, `logroestudiante`.* FROM `areas` LEFT JOIN `profesor` ON `profesor`.`idArea` = `areas`.`idArea` LEFT JOIN `logros` ON `logros`.`idProfesor` = `profesor`.`idProfesor` LEFT JOIN `logroestudiante` ON `logroestudiante`.`idLogro` = `logros`.`idLogro` WHERE (`areas`.`idArea` = %s AND `logroestudiante`.`idEstudiante` = %s AND `logros`.`idTrimestre` = %s AND (`logroestudiante`.`estado` = 1));",[idarea,idestud,idtrim])
        
        return Response(query)
    
@api_view(['POST'])
def CreateInforme(request):
    if request.method == 'POST':
        
        #OBTENCIOND DE DATOS
        idEstudiante = request.data['idestudiante']
        observacion = request.data['observacion']
        
        #BUSCAMOS LA INFORMACION DEL ESTUDIANTE
        queryEstud = querySql("SELECT CONCAT(`usuario`.`nombre`, ' ' ,`usuario`.`apellido`) AS `nombre`, `usuario`.`documento`, `usuario`.`edad`, `usuario`.`imagen`, `diagnostico`.`diagnostico` FROM `estudiante` LEFT JOIN `usuario` ON `estudiante`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `historiaclinica` ON `historiaclinica`.`idEstudiante` = `estudiante`.`idEstudiante` LEFT JOIN `condicion` ON `condicion`.`idHistoriaClinica` = `historiaclinica`.`idHistoriaClinica` LEFT JOIN `diagnostico` ON `condicion`.`idDiagnostico` = `diagnostico`.`idDiagnostico` WHERE `estudiante`.`idEstudiante` = %s;" , [idEstudiante])
        
        if len(queryEstud) == 0:
            return Response({
                "message" : "Creacion del informe cancelada",
                "error" : "Estudiante no existe"
            },status=status.HTTP_404_NOT_FOUND)
        
        #MODIFICAR LA URL DE LA IMAGEN PARA SEA FUNCIONAL
        dataEstud = queryEstud[0]
        dataEstud['imagen'] = f'http://localhost:8000/media/{dataEstud['imagen']}'
        
        template = get_template("informe.html")
        #OBJETO INICIAL EN EL CUAL 
        
        calificaciones = [ [], [], [], [], [], [] ]
        
        areas = ['Socio - Afectiva', 'Vida diaria', 'Teatro', 'Danza', 'Música', 'Pintura']

        
        for i in range(0,6):
            #query = querySql("%s", [i]) #i corresponde al area
            calificaciones[i] = logrosInforme[i]
            
        combinados = list(zip(areas, calificaciones))
        
        html_template = template.render(context = {
            "combinados" : combinados, 
            "estudiante" : dataEstud, 
            "observacion" : observacion
            })
        
        HTML(string=html_template).write_pdf(target="prueba.pdf")
        
        return Response(calificaciones)