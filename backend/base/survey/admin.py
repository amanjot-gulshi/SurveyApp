from django.contrib import admin

from .models import Choice, Question, Survey


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3

class QuestionInline(admin.TabularInline):
    model = Question

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Survey',               {'fields': ['survey']}),
        ('Question',               {'fields': ['question_text']}),
        
        
    ]
    inlines = [ChoiceInline]
    search_fields = ['question_text']


class SurveyAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Author',               {'fields': ['author']}),
        ('Title',               {'fields': ['title']}),

    ]
    inlines = [QuestionInline]
    search_fields = ['author']

admin.site.register(Question, QuestionAdmin)

admin.site.register(Survey, SurveyAdmin)