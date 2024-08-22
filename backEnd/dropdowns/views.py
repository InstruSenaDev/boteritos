from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tipodocumento, Eps, Rh, Areas, Sexo, Tipoparentesco, Rol
from .serializer import TiposDocumentoSerializer, EpsSerializer, RhSeriaizer, AreasSerializer, SexoSerializer, RolSerializer

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
            return Response({"message" : "¡Consulta fallida!", "error" : "No se encontrarón las eps"} ,status=status.HTTP_404_NOT_FOUND)

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
            return Response({"message" : "¡Consulta fallida!", "error" : "No se encontrarón los tipos de Rh"} ,status=status.HTTP_404_NOT_FOUND)

        result = RhSeriaizer(query, many = True)

        return Response(
            {"message" : "Rh encontradas" , "data" : result.data},
            status=status.HTTP_200_OK
        )
    
@api_view(['GET'])
def getSexo(request):
    
    if request.method == 'GET':
        query = Sexo.objects.all()
        
        if len(query) == 0:
            return Response(
                {"message" : "¡Consulta fallida!" , "error" : "No se encontrarón los tipos de Sexo"},
                status=status.HTTP_404_NOT_FOUND
                )
        result = SexoSerializer(query, many = True)
        return Response(
            {"message" : "Tipos de sexo encontrados" , "data" : result.data},
            status=status.HTTP_200_OK
        )
@api_view(['GET'])
def getAreas(request):
    
    if request.method == 'GET':
        query = Areas.objects.all()
        
        if len(query) == 0:
            return Response(
                {"message" : "¡Consulta fallida!" , "error" : "No se encontrarón las areas"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        result = AreasSerializer(query, many = True)
        return Response(
            {"message" : "Areas encontradas" , "data" : result.data},
            status=status.HTTP_200_OK
        )

@api_view(['GET'])
def getRoles(request):
    
    if request.method == 'GET':
        query = Rol.objects.all()
        
        if len(query) == 0:
            return Response(
                {"message" : "¡Consulta fallida!" , "error" : "No se encontrarón los roles"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        result = RolSerializer(query, many = True)
        return Response(
            {"message" : "Roles encontrados" , "data" : result.data},
            status=status.HTTP_200_OK
        )