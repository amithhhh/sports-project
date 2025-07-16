from django.urls import path
from .views import *


urlpatterns = [
    path('', PredictView.as_view()),
]