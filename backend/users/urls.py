from .views import getUser, syncUser, update_info
from django.urls import path, include

urlpatterns = [
    path('', getUser, name="userDetails"),
    path('syncuser/', syncUser, name='syncUser'),
    path('add-data/', update_info, name="update-info"),
]