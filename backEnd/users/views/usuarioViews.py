from rest_framework import viewsets, status
from rest_framework.response import Response

from ..models import Usuario

from ..serialzer.usuarioSerializer import UsuarioSerializer

from ..querySql import querySql

class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = UsuarioSerializer.Meta.model.objects.filter(estado = 1)
    #http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    
    def get_queryset(self, pk = None):
        if pk is None:
           return self.get_serializer().Meta.model.objects.filter(estado = 1)
        return self.get_serializer().Meta.model.objects.filter(estado = 1, idusuario = pk)
    
    def create(self, request):
        
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "¡Usuario creado con exito!",
                "data" : serializer.data
            })
            
        return Response(
            {"message" : "Creacion cancelada" , "error" : serializer.errors}, 
            status=status.HTTP_400_BAD_REQUEST
            )
    
    def update(self, request, pk=None):
        # Intentamos obtener la instancia específica para actualizar
        try:
            instance = self.get_queryset().get(pk=pk)
        except Usuario.DoesNotExist:
            return Response({
                "message" : "Actualizacion cancelada", 
                "error" : "¡Usuario no encontrado!"
            }, status= status.HTTP_400_BAD_REQUEST)

        # Creamos el serializer con la instancia y los nuevos datos
        serializer = self.serializer_class(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "¡Actualización exitosa!",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        
        return Response({"message": "Actualización cancelada", "error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
