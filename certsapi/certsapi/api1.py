from django.urls import include, path

urlpatterns = [
    path(
        "auth/",
        include(("accounts.api.urls", "app"), namespace="app"),
    ),
    path(
        "documents/",
        include(
            ("documents.api.urls", "documents"), namespace="documents"
        ),
    )
]
