from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import Usuario

from ..serialzer.usuarioSerializer import UsuarioSerializer
from ..serialzer.adminSerializer import AdminSerializer
from ..serialzer.fechasSerizalizer import FechasSerializer
from ..serialzer.direccionSerializer import DireccionSerializer
from ..serialzer.datosMedicosSerializer import DatosMedicosSerializer
from ..serialzer.telefonosSerializer import TelefonosSerializer

@api_view(['POST'])
def AdminCreateView(request):
    
    if request.method == 'POST':
        datos = request.data
        #2223456789
        print(request.data)
        
        #----------USUARIO----------
        serializerUsuario = UsuarioSerializer(data = datos)
        
        if not serializerUsuario.is_valid():
            return Response({
                "message" : "Creacion del usuario cancelada",
                "error" : serializerUsuario.errors
            }, status=status.HTTP_400_BAD_REQUEST)
            
        serializerUsuario.save()
        
        idUsuario = serializerUsuario.data['idusuario']
        datos['idusuario'] = idUsuario
        
        #----------FECHAS----------
        serializerFechas = FechasSerializer(data = datos)
        #VALIDAMOS FECHAS
        if not serializerFechas.is_valid():
            return Response({
                "message" : "Insert en fechas cancelado",
                "erorr" : serializerFechas.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        #----------DIRECCION----------
        direccionSerializer = DireccionSerializer(data = datos)
        if not direccionSerializer.is_valid():
            return Response({
                "message" : "Insert en direccion cancelado",
                "error" : direccionSerializer.errors
            },status=status.HTTP_400_BAD_REQUEST)
        
        #----------DATOS MEDICOS----------
        datosMedicosSerializer = DatosMedicosSerializer(data = datos)
        if not datosMedicosSerializer.is_valid():
            return Response({
                "message" : "Insert en datos medicos cancelado",
                "error" : datosMedicosSerializer.errors
            },status=status.HTTP_400_BAD_REQUEST)
        
        #----------TELEFONOS----------
        telefonoSerializer = TelefonosSerializer(data = datos)
        if not telefonoSerializer.is_valid():
            return Response({
                "message" : "Insert en telefonos cancelado",
                "error" : telefonoSerializer.errors
            },status=status.HTTP_400_BAD_REQUEST) 
        
        #----------ESTUDIANTE----------
        srAdmin = AdminSerializer(data = datos)
        if not srAdmin.is_valid():
            return Response({
                "message" : "Insert en tabla admin cancelada",
                "error" : srAdmin.errors
            }, status= status.HTTP_400_BAD_REQUEST)
            
        #GUARDAMOS FECHAS
        serializerFechas.save()
        #GUARDAMOS DIRECCION
        direccionSerializer.save()
        datosMedicosSerializer.save()
        telefonoSerializer.save()
        srAdmin.save()  
             
        return Response({
            "usuario" : serializerUsuario.data,
            "fechas" : serializerFechas.data,
            "direccion" : direccionSerializer.data,
            "datosMedicos" : datosMedicosSerializer.data,
            "telefono" : telefonoSerializer.data,
            "admin" : srAdmin.data
        }, status=status.HTTP_201_CREATED)





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
