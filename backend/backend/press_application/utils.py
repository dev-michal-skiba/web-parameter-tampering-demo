from press_application.models import Accreditation


def get_accreditation_code_for_press_application(press_application):
    if press_application.accepted:
        try:
            accreditation = Accreditation.objects.get(
                press_application=press_application)
            return accreditation.code
        except Accreditation.DoesNotExist:
            return ''
    return ''
