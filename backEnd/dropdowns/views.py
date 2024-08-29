from django.shortcuts import render
from rest_framework.response import Response
from .generalApi import GeneralListApiView
from .serializer import TiposDocumentoSerializer, EpsSerializer, RhSeriaizer, AreasSerializer, SexoSerializer, RolSerializer

class TiposDocumentoList(GeneralListApiView):
    serializer_class = TiposDocumentoSerializer

class EpsList(GeneralListApiView):
    serializer_class = EpsSerializer

class RhList(GeneralListApiView):
    serializer_class = RhSeriaizer
    
class SexoList(GeneralListApiView):
    serializer_class = SexoSerializer
    
class AreasList(GeneralListApiView):
    serializer_class = AreasSerializer

class RolesList(GeneralListApiView):
    serializer_class = RolSerializer
