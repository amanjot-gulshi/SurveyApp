from django import views
from django.urls import path
from . import views

urlpatterns = [
    path('', views.getSurveys, name="surveys"),
    path('<str:pk>/', views.getSurvey, name="survey")

]