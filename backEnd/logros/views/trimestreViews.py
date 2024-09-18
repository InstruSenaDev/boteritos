from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from ..serializers.trimestreSerializer import TrimestreSerializer
from ..models import Trimestres


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