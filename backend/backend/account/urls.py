from django.urls import path

from account.views import (
    CreateUserView, LoginView, SafeDestroyUserView, SafeUpdateUserView,
    UnsafeDestroyUserView, UnsafeUpdateUserView)


urlpatterns = [
    path('create', CreateUserView.as_view()),
    path('login', LoginView.as_view()),
    path('unsafe/update/<int:pk>', UnsafeUpdateUserView.as_view()),
    path('safe/update', SafeUpdateUserView.as_view()),
    path('unsafe/delete/<int:pk>', UnsafeDestroyUserView.as_view()),
    path('safe/delete', SafeDestroyUserView.as_view()),
]
