from django.urls import path
from .views import (
    VerifyCertView,
    UpLoadView,
    GenerateCertificateView
)

app_name ="documents"

urlpatterns = [
    path("verify-certificate", VerifyCertView.as_view(), name="verify-certificate"),
    path("upload/", UpLoadView.as_view(), name="upload"),
    path("create-certificate/", GenerateCertificateView.as_view(), name="create-certificate")
    
]