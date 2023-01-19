from asyncore import read
from dataclasses import field
from itertools import product
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Survey, Question, Choice, FilledSurvey
from rest_framework_simplejwt.tokens import RefreshToken


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('choice_text', 'question')

class QuestionSerializer(serializers.ModelSerializer):
    choices = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Question
        fields = ('question_text', 'choices')

    def get_choices(self, obj):
        choices = obj.choice_set.all()
        serializer = ChoiceSerializer(choices, many=True)
        return serializer.data


class SurveySerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField(read_only=True)
    author = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='first_name'
    )

    class Meta:
        model = Survey
        fields = '__all__'

    def get_questions(self, obj):
        questions = obj.question_set.all()
        serializer = QuestionSerializer(questions, many=True)
        return serializer.data

class SurveySerializerWithToken(SurveySerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = SurveySerializer
        fields = '__all__'

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class FilledSurveySerializer(serializers.ModelSerializer):
    taker = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='first_name'
    )
    class Meta:
        model = FilledSurvey
        fields = ['survey', 'taker', ]
