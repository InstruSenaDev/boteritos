from rest_framework.routers import DefaultRouter

from .views.usuarioViews import UsuarioViewSet
from .views.dtMedicosViews import DatosMedicosViewSet
from .views.fechasViews import FechasViewSet
from .views.profesorViews import ProfesorViewSets
from .views.responsableViews import ResponsableViewSets
#from .views.estudianteViews import EstudianteViewSets
from .views.historiaClinicaViews import HistoriaClinicaViewSets


router = DefaultRouter()

router.register(r'usuario', UsuarioViewSet, basename='usuario')
router.register(r'datosmedicos', DatosMedicosViewSet, basename='datosmedicos')
router.register(r'fechas', FechasViewSet, basename='fechas')
router.register(r'profesor', ProfesorViewSets, basename='profesor')
#router.register(r'estudiantef', EstudianteViewSets, basename='estudiantef')
router.register(r'responsable', ResponsableViewSets, basename='responsable')
#router.register(r'historiaclinica', HistoriaClinicaViewSets, basename='historiaclinica')


urlpatterns = router.urls