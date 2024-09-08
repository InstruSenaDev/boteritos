from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
        
    #path('api/v3/auth/', include('userAuth.urls')),
    path('api/v3/dropdowns/', include('dropdowns.urls')),
    path('api/v3/usuarios/', include('users.routers'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)