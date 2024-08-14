from django.urls import path
from rest_framework import routers
from dropdowns import views

router = routers.DefaultRouter()

urlpatterns = [
    path('tiposdocumento', views.getTiposDocumento),
    path('eps', views.getEps),
    path('rh', views.getRh)
]