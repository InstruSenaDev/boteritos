from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.template.loader import render_to_string
from django.core.mail import send_mail

def GenerarCorreos(asunto, texto, nombre, email):
    
        html_content = render_to_string('recupContra.html', {
            'asunto': asunto,
            'mensaje': texto,
            'nombre' : nombre
        })
        
        #ASUNTO, MENSAJE, CORREO DE ENVIO, CORREOS QUE RECIBEN
        send_mail(asunto, texto, None, [email], html_message=html_content)
    

@api_view(['POST'])
def RecuperarContrasena(request):
    
    if request.method == 'POST':
        
        documento = request.data.get('documento')
        asunto = "Recuperacion de contrasena"
        texto = "Mensaje de pruebaaaaaaaaaa WIIIIIIIIIIIIIIII"
        nombre = request.data.get('nombre')
        
        #GenerarCorreos(asunto,texto,nombre,email)
        
        return Response({
            "message" : "Correo enviado con exito!" 
        },status=status.HTTP_200_OK)