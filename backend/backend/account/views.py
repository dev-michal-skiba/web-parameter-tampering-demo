from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView, DestroyAPIView, UpdateAPIView)
from rest_framework.permissions import AllowAny, IsAuthenticated

from account.serializers import UserCreateSerializer, UserSerializer


class CreateUserView(CreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        response = super(CreateUserView, self).create(request, *args, **kwargs)
        return Response(status=response.status_code, headers=response.headers)


class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
        })


class UnsafeUserView(DestroyAPIView, UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return User.objects.all()

    def update(self, request, *args, **kwargs):
        response = super(UnsafeUserView, self).update(
            request, *args, **kwargs)
        return Response(status=response.status_code, headers=response.headers)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


class SafeUserView(DestroyAPIView, UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return User.objects.all()

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        response = super(SafeUserView, self).update(
            request, *args, **kwargs)
        return Response(status=response.status_code, headers=response.headers)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
