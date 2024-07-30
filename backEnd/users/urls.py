from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from users import views

router = routers.DefaultRouter()
#ENDPOINTS

urlpatterns= [
    path('personas', views.user),
    path('personas/<int:idPersona>', views.userOne),
    path('login', views.login)
    #path('docs/', include_docs_urls(title='Boteritos API'))
]