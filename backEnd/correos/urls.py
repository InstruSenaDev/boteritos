from django.urls import path
from .views import EnviarCorreo

urlpatterns = [
    path('prueba/', EnviarCorreo)
]