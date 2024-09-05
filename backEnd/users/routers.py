from rest_framework.routers import DefaultRouter
from .views.usuarioViews import UsuarioViewSet
from .views.dtMedicosViews import DatosMedicosViewSet

router = DefaultRouter()

router.register(r'usuario', UsuarioViewSet, basename='usuario')
router.register(r'datosmedicos', DatosMedicosViewSet, basename='datosmedicos')

urlpatterns = router.urls