from django.urls import path
from .views import (
    VerifyCertView
)

app_name ="documents"

urlpatterns = [
    path("verify-certificate/", VerifyCertView.as_view(), name="verify-certificate"),
    
]