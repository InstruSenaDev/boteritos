from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
#from userAuth.views import Login
from users.view import Login
"""
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
"""

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('api/v2/', include('users.urls')),
    path('', Login.as_view(), name='login'),
    path('api/v3/dropdowns/', include('dropdowns.urls')),
    path('api/v3/usuarios/', include('users.routers'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)