from django.urls import path

from press_application.views import (
    SafePressApplicationView, UnsafePressApplicationView)


urlpatterns = [
    path('unsafe/<int:pk>', UnsafePressApplicationView.as_view()),
    path('safe', SafePressApplicationView.as_view()),
]
