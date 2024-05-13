from django.urls import path
from . import views

urlpatterns = [
    path('api/teste', views.teste, name='teste'),
]

