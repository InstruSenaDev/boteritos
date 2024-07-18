from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Personas, Tipodocumento
from .serializer import PersonasSerializer, TipoDocumentoSerializer, UsuarioSerializer

# Create your views here.
#CONSULTAS

@api_view(['GET','POST'])
def user(request):
    
    #request es un objeto que contiene muchos atributos, uno de esos es method, que me retorna
    #el metodo http que se utilizó en la peticion
    if request.method == 'GET':
        print("EJECUCION PETICION")
        query = Personas.objects.all()
        querySerializer = PersonasSerializer(query,many = True)
        return Response(querySerializer.data) 
    
    if request.method == 'POST':
        querySerializer = PersonasSerializer(data= request.data)
        print(request.data['idRol'])
        
        if querySerializer.is_valid():
            querySerializer.save() #INSERT A PERSONAS
            #OBTENEMOS LA DATA QUE SE GUARDÓ Y ACCEDEMOS A SU ID PARA HACER EL 
            
            #INSERT EN USUARIOS
            newUser = querySerializer.data
            print(newUser.get('idpersona'))
            dataNewUser = {
                'contrasena' : newUser.get('numerodocumento'),
                'cambiocontrasena' : '0',
                'estado' : '1',
                'idpersona' : newUser.get('idpersona'),
                'idrol' : request.data['idRol']
            }
            userData = UsuarioSerializer(data=dataNewUser)
            
            if userData.is_valid():
                userData.save()
                print(userData.data)
            
            response = {
                "persona" : querySerializer.data,
                "usuario" : userData.data
            }
            
            return Response(response, status=status.HTTP_201_CREATED)
        
        return Response(querySerializer.errors)


""""
class PersonaViewSet(viewsets.ModelViewSet):
    #queryset = Personas.objects.filter(comuna='5')
    queryset = Personas.objects.all()
    serializer_class = PersonasSerializer
    
class TipoDocumentoViewSet(viewsets.ModelViewSet):
    queryset = Tipodocumento.objects.all()
    serializer_class = TipoDocumentoSerializer
"""