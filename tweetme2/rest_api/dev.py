
from django.contrib.auth import get_user_model
from rest_framework import authentication


User = get_user_model()

class DevAuthenication(authentication.BasicAuthentication):
    def authenticate(self, request):
       
        qs = User.objects.all()
        obj = qs.order_by("?").first()
        return(obj, None)
