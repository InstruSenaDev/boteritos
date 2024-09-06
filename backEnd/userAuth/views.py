from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response

# Create your views here.
#Serializer_class => recibe 2 parametros( username y password)

class Login(ObtainAuthToken):
    
    def post(self,request, *arg, **kwargs):
        
        dataLogin = {
            "username" : request.data['documento'],
            "password" : request.data['contrasena']
        }
        
        login_serializer = self.serializer_class(data = dataLogin, context = {'request' : request})
        
        if login_serializer.is_valid():
            print("PASÓ VALIDACION")
            return Response('PASOOOOOOOO')
        return Response('GOLAAAAAAAAAAZOOOOOOOOOOO')