from django.urls import path
from .views import TrimestresCreate, TrimestresList,LogrosViews, ListLogrosAdmin, Calificar, ListLogrosProfesor

urlpatterns= [
    path('trimestre/', TrimestresCreate),
    path('trimestre/<str:fecha>/', TrimestresList),
    path('logro/', LogrosViews),
    path('listlogros/admin/<int:idtrim>/', ListLogrosAdmin),
    path('listlogros/profesor/<int:idtrim>/<int:idprof>/', ListLogrosProfesor),
    path('calificar/<int:idtrim>/<int:idprof>/<int:idestud>/', Calificar)
]