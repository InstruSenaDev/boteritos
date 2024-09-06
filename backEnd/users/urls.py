from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from backEnd.users import view

router = routers.DefaultRouter()
#ENDPOINTS
"""
urlpatterns= [
    path('datosmedicos', views.datosMedicos),
    path('datosmedicos/<int:idUsuario>', views.datosMedicosOne),
    path('historiaclinica', views.historiaClinica),
    path('historiaclinica/<int:idUsuario>', views.historiaClinicaOne),
    path('responsable' , views.responsable),
    path('prueba', views.endPointPruebas)
    #path('docs/', include_docs_urls(title='Boteritos API'))
]
"""