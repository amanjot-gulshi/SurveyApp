from django.contrib import admin

# Register your models here.
from .models import UserProfile, SurveyorProfile

admin.site.register(UserProfile)
admin.site.register(SurveyorProfile)