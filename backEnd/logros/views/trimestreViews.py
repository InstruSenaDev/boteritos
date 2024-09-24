from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from ..serializers.trimestreSerializer import TrimestreSerializer
from ..models import Trimestres

@api_view(['POST'])
def TrimestresView(request):
        
    if request.method == 'POST':
        
        descripTrim = request.data.get('descripcion')
        
        if not descripTrim:
            return Response({
                "message" : "Creacion de trimestres cancelada",
                "error" : "La descripcion de la tematica es obligatoria"
            },status=status.HTTP_400_BAD_REQUEST)
         
        dataTrim = request.data.get('trimestres')
        
        if not dataTrim or len(dataTrim) == 0:
            return Response({
                "message" : "Crecion de trimestres cancelada",
                "error" : "Los datos de cada trimestre son obligatorios"
            },status=status.HTTP_400_BAD_REQUEST)
        
        nuevosTrim = []
        
        for trimestre in dataTrim:
            nuevoTrim = Trimestres(
                trimestre = trimestre['trimestre'],
                descripcion = descripTrim,
                fechainicio = trimestre['fechainicio'],
                fechafin = trimestre['fechafin'],
                estado = 0
            )
            
            nuevosTrim.append(nuevoTrim)
        
        # INSERTAR SIMULTANEAMENTE LOS TRIMESTRES
        trimestres = Trimestres.objects.bulk_create(nuevosTrim)

        # Serializar los objetos creados
        srTrimestre = TrimestreSerializer(trimestres, many=True)
                    
        return Response({
            "message" : "Creacion de trimestres cancelada",
            "error" : srTrimestre.data
        },status=status.HTTP_201_CREATED)


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