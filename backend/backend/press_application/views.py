from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from press_application.models import PressApplication
from press_application.serializers import PressApplicationSerializer
from press_application.utils import (
    get_accreditation_code_for_press_application)


class UnsafePressApplicationView(RetrieveAPIView, CreateAPIView):
    serializer_class = PressApplicationSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user_pk = kwargs.get('pk')
        press_application = get_object_or_404(
            PressApplication, user__pk=user_pk)
        accreditation_code = get_accreditation_code_for_press_application(
            press_application
        )
        response_data = {
            'organization': press_application.organization,
            'note': press_application.note,
            'accreditation': accreditation_code,
            'accepted': press_application.accepted
        }
        return Response(response_data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_pk = kwargs.get('pk')
        user = User.objects.get(pk=user_pk)
        self.perform_create(serializer, user)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer, user):
        serializer.save(user=user)


class SafePressApplicationView(RetrieveAPIView, CreateAPIView):
    serializer_class = PressApplicationSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        press_application = get_object_or_404(
            PressApplication, user=request.user)
        accreditation_code = get_accreditation_code_for_press_application(
            press_application
        )
        response_data = {
            'organization': press_application.organization,
            'note': press_application.note,
            'accreditation': accreditation_code,
            'accepted': press_application.accepted
        }
        return Response(response_data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer, request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer, user):
        serializer.save(user=user)
