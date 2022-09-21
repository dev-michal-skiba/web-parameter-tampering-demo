from django.contrib.auth.models import User
from rest_framework.serializers import CharField, ModelSerializer

from press_application.models import PressApplication


class PressApplicationUnsafeSerializer(ModelSerializer):
    user_id = CharField()

    class Meta:
        model = PressApplication
        fields = ['user_id', 'organization', 'note']
        extra_kwargs = {
            'user_id': {'required': True},
            'organization': {'required': True},
            'note': {'required': True},
        }

    def create(self, validated_data):
        user = User.objects.get(pk=validated_data['user_id'])
        press_application = PressApplication(
            user=user, organization=validated_data['organization'],
            note=validated_data['note']
        )
        press_application.save()
        return press_application


class PressApplicationSafeSerializer(ModelSerializer):
    class Meta:
        model = PressApplication
        fields = ['organization', 'note']
        extra_kwargs = {
            'organization': {'required': True},
            'note': {'required': True},
        }

    def create(self, validated_data):
        press_application = PressApplication(
            user=validated_data['user'],
            organization=validated_data['organization'],
            note=validated_data['note']
        )
        press_application.save()
        return press_application
