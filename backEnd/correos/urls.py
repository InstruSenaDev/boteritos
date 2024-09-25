from django.urls import path
from .views import RecuperarContrasena

urlpatterns = [
    path('recuperar/', RecuperarContrasena)
]