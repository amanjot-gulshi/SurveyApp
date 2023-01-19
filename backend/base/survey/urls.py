from django import views
from django.urls import path
from . import views

urlpatterns = [
    path('', views.getSurveys, name="surveys"),
    path('<str:pk>/<str:title>', views.getSurvey, name="survey"),
    path('my-surveys/', views.getMySurveys, name='my-surveys'),
    path('filled-surveys/', views.getFilledSurveys, name='filled-surveys'),
    path('create', views.createSurvey, name="create"),
    path('fill', views.fillSurvey, name="fill"),

]