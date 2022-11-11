from django.shortcuts import render
from .models import Survey
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import SurveySerializer

# Create your views here.

@api_view(['GET'])
def getSurveys(request):

    surveys = Survey.objects.all()
    
    serializer = SurveySerializer(surveys, many=True)

    return Response({'surveys' : serializer.data})


@api_view(['GET'])
def getSurvey(request, pk):

    survey = Survey.objects.get(id=pk)

    serializer = SurveySerializer(survey, many=False)

    return Response(serializer.data)