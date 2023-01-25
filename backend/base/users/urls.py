from django.urls import path
from django import views
from . import views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('register/user', views.registerUser, name='register-user'),

    path('profile/', views.getUserProfile, name="users-profile"),

    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    
    path('', views.getUsers, name="users"),

    path('<str:pk>/', views.getUserById, name='user'),

    path('update/<str:pk>/', views.updateUser, name='user-update'),

    path('delete/<int:pk>/', views.deleteUser, name='user-delete'),
]