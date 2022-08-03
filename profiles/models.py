from re import T
from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL
# Create your models here.
class Profile (models.Model):
    user  = models.OneToOneField(User,on_delete=models.CASCADE)
    location = models.CharField(max_length=200, blank=True, null=True)
    bio = models.CharField(blank=True, null=True, max_length=200)

