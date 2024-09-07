from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Usuario
from datetime import datetime, timedelta

@api_view(['POST'])
def Login(request):
    
    if request.method == 'POST':
        
        payload = {
            'idusuario': "" ,
            'nombre': "" ,
            'apellido' : "",
            'exp':  "", #timedelta(seconds=settings.JWT_EXPIRATION_TIME),
            'iat': datetime.utcnow(),
        }
        pass

"""
class LoginView(APIView):
    
    def post(self,request):
        documento = request.data['documento']
        contrasena = request.data['contrasena']
        
        usuario = Usuario.objects.filter(documento = documento).first()
        print(usuario)
        
        return Response('KONICHIWAAAAAAA')
"""