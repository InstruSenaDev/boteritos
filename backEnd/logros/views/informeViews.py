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
        
        template = get_template("informe.html")
        #OBJETO INICIAL EN EL CUAL 
        
        calificaciones = [ [], [], [], [], [], [] ]
        print(calificaciones[1])
        areas = ['Socio - Afectiva', 'Vida diaria', 'Teatro', 'Danza', 'Música', 'Pintura']
        
        for i in range(1,7):
            print('----------------------------------------------')
            
            #query = querySql("%s", [i]) #i corresponde al area
            
            print(logrosInforme[i])
            
            calificaciones[i] = logrosInforme[i]
            
            """
            for values in logrosInforme[i]:
                print('----------')
                print(values)
            """
        
        print('/////////////////////////////////////////////////////////')
        print(calificaciones)            
        print('/////////////////////////////////////////////////////////')
        
        for i in calificaciones:
            print(i)

        html_template = template.render(context = {"calificaciones" : calificaciones, "areas" : areas})
        
        HTML(string=html_template).write_pdf(target="prueba.pdf")
        
        return Response(calificaciones)