from django.urls import path
from .views import (
    VerifyCertView,
    UpLoadView,
    GenerateCertificateView,
    DashboardStatsView,
    RecentCertificatesView
)

app_name ="documents"

urlpatterns = [
    path("verify-certificate", VerifyCertView.as_view(), name="verify-certificate"),
    path("upload/", UpLoadView.as_view(), name="upload"),
    path("create-certificate/", GenerateCertificateView.as_view(), name="create-certificate"),
    path("dashboard-stats/", DashboardStatsView.as_view(), name="dashboard-stats"),
    path("recent-certificates/", RecentCertificatesView.as_view(), name="recent-certificates"),
]