from django.urls import path
from . import views

urlpatterns = [
    path("", views.base),
    path("ping/", views.ping),
    path("create-trip/", views.create_trip, name="create_trip"),
]