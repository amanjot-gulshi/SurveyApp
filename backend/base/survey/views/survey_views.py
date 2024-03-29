from ..models import Survey, Question, Choice, FilledSurvey, Answer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from ..serializers import SurveySerializer, FilledSurveySerializer
from rest_framework import status
from django.contrib.auth.models import User

# Create your views here.

@api_view(['GET'])
def getSurveys(request):

    surveys = Survey.objects.all()

    serializer = SurveySerializer(surveys, many=True)

    return Response({'surveys': serializer.data})


@api_view(['GET'])
def getMySurveys(request):
    data = request.GET
    print(data['user'])

    profile = User.objects.get(email=data['user'])

    surveys = Survey.objects.filter(author=profile)

    serializer = SurveySerializer(surveys, many=True)

    return Response({'surveys': serializer.data})



@api_view(['GET'])
def getSurvey(request, pk, title):

    survey = Survey.objects.get(id=pk)

    serializer = SurveySerializer(survey, many=False)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createSurvey(request):
    data = request.data
    print(data)
    try:
        profile = User.objects.get(email=data['email'])
        aSurvey = Survey.objects.create(
            author=profile,
            title=data['title']

        )
        for ques in data['questions']:
            aQuestion = Question.objects.create(
                question_text=ques['question'],
                survey=aSurvey
            )
            # print( question['choice']['option1'])
            Choice.objects.create(
                question=aQuestion,
                choice_text=ques['choice']['option1']
            )
            Choice.objects.create(
                question=aQuestion,
                choice_text=ques['choice']['option2']
            )
            Choice.objects.create(
                question=aQuestion,
                choice_text=ques['choice']['option3']
            )
            Choice.objects.create(
                question=aQuestion,
                choice_text=ques['choice']['option4']
            )

        serializer = SurveySerializer(aSurvey, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Error with creating Survey'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fillSurvey(request):
    data = request.data
    print(data)

    try:
        profile = User.objects.get(email=data['taker'])
        aSurvey = Survey.objects.get(title=data['title'])

        filledSurvey = FilledSurvey.objects.create(
            survey=aSurvey,
            taker=profile,
        )

        for option in data['options'].values():
            Answer.objects.create(
                survey=filledSurvey,
                answer_text=option
            )

        serializer = FilledSurveySerializer(filledSurvey, many=False)
        return Response(serializer.data)

    except:
        message = {'detail': 'Error filling out survey'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getFilledSurveys(request):

    data = request.GET
    print(data['user'])

    profile = User.objects.get(email=data['user'])

    surveys = FilledSurvey.objects.filter(taker=profile)

    serializer = FilledSurveySerializer(surveys, many=True)

    return Response({'survey': serializer.data})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateSurvey(request, pk):
    survey = Survey.objects.get(_id=pk)
    serializer = SurveySerializer(survey, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteSurvey(request, pk):
    survey = Survey.objects.get(id=pk)
    survey.delete()
    return Response('Producted Deleted')

