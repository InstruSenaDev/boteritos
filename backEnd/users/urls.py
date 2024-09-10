from django.urls import path, include
from .views.estudianteViews import EstudianteTableAdmin, EstudianteHeaderAdmin

urlpatterns= [
    path('estudiantes/tabla', EstudianteTableAdmin),
    path('estudiantes/header/<int:id>', EstudianteHeaderAdmin)
    #path('docs/', include_docs_urls(title='Boteritos API'))
]