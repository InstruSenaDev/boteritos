from django.urls import path, include
from .views.estudianteViews import EstudianteTableAdmin

urlpatterns= [
    path('estudiantes/tabla', EstudianteTableAdmin)
    #path('docs/', include_docs_urls(title='Boteritos API'))
]