from django.urls import path
from . import views

urlpatterns = [
    path('character/', views.character_recommendation),
]
