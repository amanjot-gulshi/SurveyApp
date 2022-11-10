from django import views
from django.urls import path
from ..views import survey_views

urlpatterns = [
    path('', survey_views.getSurveys, name="surveys"),
    path('<str:pk>/', survey_views.getSurvey, name="survey")

]