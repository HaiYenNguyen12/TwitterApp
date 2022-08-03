import profile
from re import T
from django.conf import settings
from django.db import models
from django.db.models.signals import post_save



User = settings.AUTH_USER_MODEL


class FollowerRelation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile  = models.ForeignKey("Profile", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


# Create your models here.
class Profile (models.Model):
    user  = models.OneToOneField(User,on_delete=models.CASCADE)
    location = models.CharField(max_length=200, blank=True, null=True)
    bio = models.CharField(blank=True, null=True, max_length=200)

    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    follower = models.ManyToManyField(User, related_name='following', blank=True)


    """
    project_obj = Profile.objects.first()
    project_obj.followers.all() -> All users following this profile
    user.following.all() -> All users I follow
    """


def user_did_save(sender, instance, created, *args, **kwargs):
    if created:
        print("nicess")
        Profile.objects.get_or_create(user=instance)

post_save.connect(user_did_save, sender=User)




