from django.urls import path
from .views import TrimestresView, LogrosViews, ListLogros, Calificar

urlpatterns= [
    path('trimestre/', TrimestresView),
    path('logro/', LogrosViews),
    path('listlogros/', ListLogros),
    path('calificar/<int:id>/' , Calificar)
]