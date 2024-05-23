from django.urls import path
from .views import login, create_appointment, get_appointments, reserve_appointment_slot, get_user_appointments, availability, pay_for_appointment, home

urlpatterns = [
    path('', home, name='home'),
    path('login/', login, name='login'),
    path('appointments/create/', create_appointment, name='create_appointment'),
    path('appointments/get/', get_appointments, name='get_appointments'),
    path('appointments/<str:email>/', get_user_appointments, name='get_user_appointments'),
    path('appointments/pay/', pay_for_appointment, name='pay_for_appointment'),
    path('availability/', availability, name='availability'),
    path('reserve/', reserve_appointment_slot, name='reserve_appointment_slot'),
]