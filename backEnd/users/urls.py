from django.urls import path, include
from .views.estudianteViews import EstudianteTableAdmin, EstudianteHeaderAdmin, EstudianteCreateView

urlpatterns= [
    path('estudiantes/tabla', EstudianteTableAdmin),
    path('estudiantes/header/<int:id>', EstudianteHeaderAdmin),
    path('estudiante/', EstudianteCreateView)
    #path('docs/', include_docs_urls(title='Boteritos API'))
]