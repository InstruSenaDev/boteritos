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
from .views.fechasViews import FechasEstudiantesOne, FechasUpdate
from .views.direccionViews import DireccionEstudianteOne, DireccionUpdate

from .middleware import searchDocument

@api_view(['POST'])
def prueba(request):
    if request.method == 'POST':
        print(request.data)
        return Response('HOLAAAA')

urlpatterns= [
    
    path('estudiante/', EstudianteCreateView), #REGISTRO DE ESTUDIANTE
    path('estudiante/<int:id>', EstudianteDataPersonal),
    path('estudiantes/tabla', EstudianteTableAdmin),
    path('estudiantes/header/<int:id>', EstudianteHeaderAdmin),
    
    path('profesor/', ProfesorCreateView),
    
    path('admin/', AdminCreateView),
    
    path('responsable/', ResponsableView),
    path('responsable/<int:id>', ResponsableOne),#SE PASA EL ID DEL ESTUDIANTE  
    
    path('historiaclinica/', HistoriaClinica),
    path('historiaclinica/<int:id>', HistoriaClinicaOne), #SE PASA EL ID DEL ESTUDIANTE
    
    path('datosmedicos/', DatosMedicosUpdate),
    path('datosmedicos/estudiante/<int:id>', DatosMedicosEstudianteOne), #SE PASA EL ID DEL ESTUDIANE
    
    path('telefono/', TelefonosUpdate),
    path('telefono/estudiante/<int:id>', TelefonosEstudiante),#SE PASA EL ID DEL ESTUDIANTE
    
    path('fechas/', FechasUpdate),
    path('fechas/estudiante/<int:id>', FechasEstudiantesOne),
    
    path('direccion/', DireccionUpdate),
    path('direccion/estudiante/<int:id>', DireccionEstudianteOne),
    
    path('checkdoc/<int:doc>', searchDocument),
    path('prueba/', prueba),
    
    #path('docs/', include_docs_urls(title='Boteritos API'))
]