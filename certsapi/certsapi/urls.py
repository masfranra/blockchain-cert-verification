from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(("certsapi.api1", "api1"), namespace="api1"))
]

urlpatterns += static(
    settings.STATIC_URL, document_root=settings.STATIC_ROOT
)

urlpatterns += static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)
admin.site.site_header = "Certificate Verification"
admin.site.site_title = "Certs Admin Portal"
admin.site.index_title = "Welcome to Certs Portal"