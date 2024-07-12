from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from system import views

router = routers.DefaultRouter()
#ENDPOINTS
router.register(r'personas', views.PersonaViewSet, 'people')
router.register(r'tipodoc', views.TipoDocumentoViewSet)

urlpatterns= [
    path('', include(router.urls))
    #path('docs/', include_docs_urls(title='Boteritos API'))
]