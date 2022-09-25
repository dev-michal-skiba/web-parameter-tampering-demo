from rest_framework.serializers import ModelSerializer

from press_application.models import PressApplication


class PressApplicationSerializer(ModelSerializer):
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
