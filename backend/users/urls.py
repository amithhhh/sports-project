from .views import getUser
from django.urls import path, include

urlpatterns = [
    path('', getUser, name="userDetails")
]