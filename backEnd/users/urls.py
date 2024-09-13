from django.urls import path, include
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .views.estudianteViews import EstudianteTableAdmin, EstudianteHeaderAdmin, EstudianteCreateView, EstudianteDataPersonal
from .views.historiaClinicaViews import HistoriaClinicaOne, HistoriaClinica
from .views.profesorViews import ProfesorCreateView
from .views.usuarioViews import AdminCreateView
from .views.responsableViews import ResponsableOne, ResponsableView
from .views.dtMedicosViews import DatosMedicosEstudianteOne, DatosMedicosUpdate
from .views.telefonosViews import TelefonosEstudiante, TelefonosUpdate
from .middleware import searchDocument

@api_view(['POST'])
def prueba(request):
    if request.method == 'POST':
        print(request.data)
        return Response('HOLAAAA')

urlpatterns= [
    
    path('estudiantes/tabla', EstudianteTableAdmin),
    path('estudiantes/header/<int:id>', EstudianteHeaderAdmin),
    path('estudiante/', EstudianteCreateView), #REGISTRO DE ESTUDIANTE
    path('estudiante/<int:id>', EstudianteDataPersonal),
    
    path('profesor/', ProfesorCreateView),
    
    path('admin/', AdminCreateView),
    
    path('responsable/<int:id>', ResponsableOne),
    path('responsable/', ResponsableView),
    
    path('historiaclinica/<int:id>', HistoriaClinicaOne),
    path('historiaclinica/', HistoriaClinica),
    
    path('datosmedicos/', DatosMedicosUpdate),
    path('datosmedicos/estudiante/<int:id>', DatosMedicosEstudianteOne),
    
    path('telefono/<int:id>', TelefonosEstudiante),
    path('telefono/', TelefonosUpdate),
    
    #path('fechas/<int:id>'),
    
    path('checkdoc/<int:doc>', searchDocument),
    path('prueba/', prueba),
    
    #path('docs/', include_docs_urls(title='Boteritos API'))
]