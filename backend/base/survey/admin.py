from django.contrib import admin

from .models import Choice, Question, Survey, FilledSurvey, Answer


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


class AnswerInLine(admin.TabularInline):
    model = Answer

class FilledSurveyAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Taker',               {'fields': ['taker']}),
        ('Survey',               {'fields': ['survey']}),

    ]
    inlines = [AnswerInLine]
    search_fields = ['taker']


admin.site.register(Question, QuestionAdmin)

admin.site.register(Survey, SurveyAdmin)

admin.site.register(FilledSurvey, FilledSurveyAdmin)
