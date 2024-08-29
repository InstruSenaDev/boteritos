from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from system import views
from django.http import HttpResponse

def simple_view(request):
    return HttpResponse("Funciona")

urlpatterns = [
    path('test/', simple_view),
]   