from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from datetime import date

from ..serializers.logrosSerializer import LogrosSerializer, CalificarSerializer
from ..models import Logros, Estudiante, Logroestudiante, Trimestres
from helper.querySql import querySql

#TRIMESTRE, AREA, ID ESTUDIANTE, (CONDICION QUE SEA ESTADO = 1)
@api_view(['GET'])
def InformeList(request,idtrim,idarea,idestud):
    
    if request.method == 'GET':
        
        query = querySql("SELECT `areas`.`area`, `profesor`.`idProfesor`, `logros`.`idLogro`,`logros`.`logro`, `logros`.`idTrimestre`, `logroestudiante`.* FROM `areas` LEFT JOIN `profesor` ON `profesor`.`idArea` = `areas`.`idArea` LEFT JOIN `logros` ON `logros`.`idProfesor` = `profesor`.`idProfesor` LEFT JOIN `logroestudiante` ON `logroestudiante`.`idLogro` = `logros`.`idLogro` WHERE (`areas`.`idArea` = %s AND `logroestudiante`.`idEstudiante` = %s AND `logros`.`idTrimestre` = %s AND (`logroestudiante`.`estado` = 1));",[idarea,idestud,idtrim])
        
        return Response(query)