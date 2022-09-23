from uuid import uuid4

from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save


class PressApplication(models.Model):
    user = models.OneToOneField(
        User, related_name='press_application', on_delete=models.CASCADE
    )
    organization = models.CharField(max_length=32)
    note = models.CharField(max_length=1024)
    accepted = models.BooleanField(default=False)


class Accreditation(models.Model):
    press_application = models.OneToOneField(
        PressApplication, related_name='accreditation',
        on_delete=models.CASCADE
    )
    code = models.CharField(max_length=36, default=uuid4)


def create_accreditation_for_press_application(
        sender, instance, created, **kwargs
):
    if created:
        Accreditation.objects.create(press_application=instance)


post_save.connect(create_accreditation_for_press_application, PressApplication)
