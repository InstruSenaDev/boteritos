from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from users import views

router = routers.DefaultRouter()
#ENDPOINTS

urlpatterns= [
    path('usuarios', views.user),
    path('usuarios/<int:idUsuario>', views.userOne),
    path('login', views.login),
    path('datosmedicos', views.datosMedicos),
    path('datosmedicos/<int:idUsuario>', views.datosMedicosOne),
    path('historiaclinica', views.historiaClinica),
    path('historiaclinica/<int:idUsuario>', views.historiaClinicaOne)
    #path('docs/', include_docs_urls(title='Boteritos API'))
]