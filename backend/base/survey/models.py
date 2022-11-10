from asyncio.windows_events import NULL
from datetime import datetime
from decimal import DefaultContext
from email.policy import default
from enum import unique
from tokenize import blank_re
from xmlrpc.client import DateTime
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Survey(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published', default=datetime.now)

    def __str__(self):
        return self.title


class Question(models.Model):
    question_text = models.CharField(max_length=200, blank=True)
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)

    def __str__(self):
        return self.question_text

    class Meta:
        unique_together = [['question_text', 'survey']]


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.choice_text



