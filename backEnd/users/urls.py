from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from users import views

router = routers.DefaultRouter()
#ENDPOINTS

urlpatterns= [
    path('usuarios', views.UsuariosList.as_view() ),
    path('usuarios/create', views.UsuariosCreate.as_view() ),
    path('usuarios/update/<int:pk>', views.UsuarioUpdate.as_view() ),   
    
    path('login', views.login),
    path('datosmedicos', views.datosMedicos),
    path('datosmedicos/<int:idUsuario>', views.datosMedicosOne),
    path('historiaclinica', views.historiaClinica),
    path('historiaclinica/<int:idUsuario>', views.historiaClinicaOne),
    path('responsable' , views.responsable),
    path('prueba', views.endPointPruebas)
    #path('docs/', include_docs_urls(title='Boteritos API'))
]