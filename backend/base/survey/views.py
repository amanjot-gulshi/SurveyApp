from django.shortcuts import render
from .models import Survey, Question, Choice
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .serializers import SurveySerializer, SurveySerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from users.models import UserProfile

# Create your views here.


@api_view(['GET'])
def getSurveys(request):

    surveys = Survey.objects.all()

    serializer = SurveySerializer(surveys, many=True)

    return Response({'surveys': serializer.data})


@api_view(['GET'])
def getSurvey(request, pk):

    survey = Survey.objects.get(id=pk)

    serializer = SurveySerializer(survey, many=False)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createSurvey(request):
    data = request.data
    print(data)
    try:
        profile = UserProfile.objects.get(email=data['email'])
        aSurvey = Survey.objects.create(
            author=profile,
            title=data['title']

        )
        for question in data['questions']:
            aQuestion = Question.objects.create(
                question_text=question['question'],
                survey = aSurvey
            )
            choiceA = Choice.objects.create(
               choice_text=question['option1'],
               question = aQuestion
            )
            choiceB = Choice.objects.create(
               choice_text=question['option2'],
               question = aQuestion
            )
            choiceC = Choice.objects.create(
               choice_text=question['option3'],
               question = aQuestion
            )
            choiceD = Choice.objects.create(
               choice_text=question['option4'],
               question = aQuestion
            )
            

        serializer = SurveySerializer(aSurvey, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Error with creating Survey'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
