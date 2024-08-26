from django.urls import path
from .views import *

urlpatterns = [
    path('api/emps/', getEmps, name='getEmps'),
    path('api/emps/add/', addEmps, name='addEmps'),
    path('api/emps/delete/<int:x>/', deleteEmps, name='deleteEmps'),
    path('api/emps/update/<int:x>/', updateEmps, name='updateEmps'),
]