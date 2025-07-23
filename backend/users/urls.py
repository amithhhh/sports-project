from .views import getUser, syncUser
from django.urls import path, include

urlpatterns = [
    path('', getUser, name="userDetails"),
    path('syncuser/', syncUser, name='syncUser')
]