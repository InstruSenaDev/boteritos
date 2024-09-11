from django.urls import path, include
from .views.estudianteViews import EstudianteTableAdmin, EstudianteHeaderAdmin
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def prueba(request):
    if request.method == 'POST':
        print(request.data)
        return Response(request.data)

urlpatterns= [
    path('estudiantes/tabla', EstudianteTableAdmin),
    path('estudiantes/header/<int:id>', EstudianteHeaderAdmin),
    path('prueba/', prueba)
    #path('docs/', include_docs_urls(title='Boteritos API'))
]