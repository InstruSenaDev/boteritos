from django.urls import path
from .views import TrimestresCreate, TrimestresList,LogrosViews, ListLogrosAdmin, Calificar, ListLogrosProfesor

urlpatterns= [
    path('trimestre/', TrimestresCreate),
    path('trimestre/<str:fecha>/', TrimestresList),
    path('logro/', LogrosViews),
    path('listlogros/admin/<int:trimestre>/', ListLogrosAdmin),
    path('listlogros/profesor/<int:idtrim>/<int:idprof>/', ListLogrosProfesor),
    path('calificar/<int:id>/' , Calificar)
]