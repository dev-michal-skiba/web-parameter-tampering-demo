from django.contrib import admin

from press_application.models import Accreditation, PressApplication

# Register your models here.
admin.site.register(PressApplication)
admin.site.register(Accreditation)
