from asyncore import read
from dataclasses import field
from itertools import product
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Survey, Question, Choice
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
        slug_field='institution_name'
    )

    class Meta:
        model = Survey
        fields = '__all__'

    def get_questions(self, obj):
        questions = obj.question_set.all()
        serializer = QuestionSerializer(questions, many=True)
        return serializer.data