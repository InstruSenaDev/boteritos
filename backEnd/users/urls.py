from django.urls import path, include
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .views.estudianteViews import EstudianteTableAdmin, EstudianteHeaderAdmin, EstudianteCreateView
from .views.profesorViews import ProfesorCreateView
from .middleware import searchDocument

@api_view(['POST'])
def prueba(request):
    if request.method == 'POST':
        print(request.data)
        return Response('HOLAAAA')

urlpatterns= [
    path('estudiantes/tabla', EstudianteTableAdmin),
    path('estudiantes/header/<int:id>', EstudianteHeaderAdmin),
    path('estudiante/', EstudianteCreateView),
    path('profesor/', ProfesorCreateView),
    path('checkdoc/<int:doc>', searchDocument),
    path('prueba/', prueba),
    
    #path('docs/', include_docs_urls(title='Boteritos API'))
]