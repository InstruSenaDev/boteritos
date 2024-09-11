from django.urls import path, include
from .views.estudianteViews import EstudianteTableAdmin, EstudianteHeaderAdmin, EstudianteCreateView
from .views.profesorViews import ProfesorCreateView

urlpatterns= [
    path('estudiantes/tabla', EstudianteTableAdmin),
    path('estudiantes/header/<int:id>', EstudianteHeaderAdmin),
    path('estudiante/', EstudianteCreateView),
    path('profesor/', ProfesorCreateView)
    #path('docs/', include_docs_urls(title='Boteritos API'))
]