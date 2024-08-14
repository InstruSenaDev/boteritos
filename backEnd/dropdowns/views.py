from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tipodocumento, Eps, Rh, Areas, Sexo, Tipoparentesco
from .serializer import TiposDocumentoSerializer, EpsSerializer, RhSeriaizer

# Create your views here.
@api_view(['GET'])
def getTiposDocumento(request):
    
    if request.method == 'GET':
        query = Tipodocumento.objects.all()

        #Manejo por si no se encuentran los tipos de documento
        if len(query) == 0:
            return Response({"message" : "¡Consulta fallida!", "error" : "No se encontrarón los tipos de documentos"} ,status=status.HTTP_404_NOT_FOUND)
        result = TiposDocumentoSerializer(query, many = True)

        return Response(
            {"message" : "Tipos de documento encontrados" , "data" : result.data}, 
            status=status.HTTP_200_OK
            )

@api_view(['GET'])
def getEps(request):

    if request.method == 'GET':
        query = Eps.objects.all()

        #Manejo por si no se encuentran eps
        if len(query) == 0:
            return Response({"message" : "¡Consulta fallida!", "error" : "No se encontrarón eps"} ,status=status.HTTP_404_NOT_FOUND)

        result = EpsSerializer(query, many = True)

        return Response(
            {"message" : "Eps encontradas", "data" : result.data}, 
            status=status.HTTP_200_OK
            )
    
@api_view(['GET'])
def getRh(request):

    if request.method == 'GET':
        query = Rh.objects.all()
        #Manejo por si no se encuentran los Rh
        if len(query) == 0:
            return Response({"message" : "¡Consulta fallida!", "error" : "No se encontrarón los Rh"} ,status=status.HTTP_404_NOT_FOUND)

        result = RhSeriaizer(query, many = True)

        return Response(
            {"message" : "Rh encontradas" , "data" : result.data},
            status=status.HTTP_200_OK
        )
    
