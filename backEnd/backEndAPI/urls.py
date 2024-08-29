from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
"""
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
"""
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v2/', include('users.urls')),
    path('api/v2/dropdowns/', include('dropdowns.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)