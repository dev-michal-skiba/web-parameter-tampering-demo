from django.urls import path

from account.views import (
    CreateUserView, LoginView, SafeUserView, UnsafeUserView)


urlpatterns = [
    path('create', CreateUserView.as_view()),
    path('login', LoginView.as_view()),
    path('unsafe/<int:pk>', UnsafeUserView.as_view()),
    path('safe', SafeUserView.as_view()),
]
