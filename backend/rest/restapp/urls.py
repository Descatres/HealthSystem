from django.urls import path
from .views import login, create_appointment, get_appointments

urlpatterns = [
    path('login/', login, name='login'),
    path('appointments/', create_appointment, name='create_appointment'),
    path('appointments/<int:user_id>/', get_appointments, name='get_appointments'),
    path('reserve/', reserve_appointment_slot, name='reserve_appointment_slot'),
]