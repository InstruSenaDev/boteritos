from rest_framework.routers import DefaultRouter

from .views.usuarioViews import UsuarioViewSet
from .views.dtMedicosViews import DatosMedicosViewSet
from .views.fechasViews import FechasViewSet
from .views.profesorViews import ProfesorViewSets

router = DefaultRouter()

router.register(r'usuario', UsuarioViewSet, basename='usuario')
router.register(r'datosmedicos', DatosMedicosViewSet, basename='datosmedicos')
router.register(r'fechas', FechasViewSet, basename='fechas')
router.register(r'profesor', ProfesorViewSets, basename='profesor')

urlpatterns = router.urls