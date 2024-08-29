from django.urls import path
from rest_framework import routers
from dropdowns import views

router = routers.DefaultRouter()

urlpatterns = [
    path('tiposdocumento', views.TiposDocumentoList.as_view()),
    path('eps', views.EpsList.as_view()),
    path('rh', views.RhList.as_view()),
    path('sexo', views.SexoList.as_view()),
    path('areas', views.AreasList.as_view()),
    path('roles' , views.RolesList.as_view())
]