from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.template.loader import render_to_string
from django.core.mail import send_mail
from .models import Usuario
from .token import CreateToken

def GenerarCorreos(asunto, texto, nombre, email,token):
    
    html_content = render_to_string('recupContra.html', {
        'mensaje': texto,
        'nombre' : nombre,
        'token' : 'PITOOOOOOO'
    })
    
    #ASUNTO, MENSAJE, CORREO DE ENVIO, CORREOS QUE RECIBEN
    #ENVIAMOS EL CORREO
    send_mail(asunto, None, None, [email], html_message=html_content)
        
        

def EncriptarCorreo(correo):
    #DIVISIONES DEL CORREO
    arrayCorreo = correo.split('@')
    #OBTENCION DE DATOS
    correoTxt = arrayCorreo[0]
    type = arrayCorreo[1]
    letrasVis = correoTxt[:3]
    
    #ANADIMOS LOS *
    encriptado = f"{letrasVis}{'*'* (len(correoTxt) - 3 ) }"
        
    return f"{encriptado}@{type}" 
    

@api_view(['POST'])
def RecuperarContrasena(request):
    
    if request.method == 'POST':
        
        documento = request.data.get('documento')
        
        query = Usuario.objects.filter(documento = documento).first()
        
        if not query:
            return Response({
                "message" : "Cambio de contrasena cancelado",
                "error" : "Documento no encontrado"
            },status=status.HTTP_404_NOT_FOUND)
        
        correo = query.correo
        #Encriptacion del correo
        correoEncriptado = EncriptarCorreo(correo)
    
        asunto = "Recuperacion de contraseña"
        nombre = f"{query.nombre} {query.apellido}"
        texto = "Haz clic en el enlace de abajo para recuperar tu contraseña y poder iniciar sesión"
        
        token = CreateToken(query.idusuario)
        
        GenerarCorreos(asunto,texto,nombre,correo,token)
        
        return Response({
            "message" : "Correo enviado con exito!" ,
            "data" : {
                "correo" : correoEncriptado
            }
        },status=status.HTTP_200_OK)