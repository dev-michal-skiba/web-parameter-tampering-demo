from django.contrib.auth.models import User
from django.db import models


class PressApplication(models.Model):
    user = models.OneToOneField(
        User, related_name='press_application', on_delete=models.CASCADE
    )
    organization = models.CharField(max_length=32)
    note = models.CharField(max_length=1024)
    accepted = models.BooleanField(default=False)
