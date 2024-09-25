from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.template.loader import render_to_string
from django.core.mail import send_mail

@api_view(['POST'])
def EnviarCorreo(request):
    
    if request.method == 'POST':
        
        email = "juansatizabal2701@gmail.com"
        asunto = "Pruebas Correos"
        texto = "Mensaje de pruebaaaaaaaaaa WIIIIIIIIIIIIIIII"
        nombre = 'Juan Jose Cuartas'
        
        html_content = render_to_string('recupContra.html', {
            'asunto': asunto,
            'mensaje': texto,
            'nombre' : nombre
        })
        
        #ASUNTO, MENSAJE, CORREO DE ENVIO, CORREOS QUE RECIBEN
        send_mail(asunto, texto, None, [email], html_message=html_content)
        
        return Response({
            "message" : "Correo enviado con exito!" 
        },status=status.HTTP_200_OK)