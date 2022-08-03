import random
from django.db import models
from django.conf import settings
from django.db.models import Q

# Create your models here.

User = settings.AUTH_USER_MODEL


class TweetQuerySet(models.QuerySet):
    def by_username(self, username):
        return self.filter(user__username__iexact = username)

    def feed(self, user):
        profiles_exist = user.following.exists()
        follow_users_id = []
        if profiles_exist:
            follow_users_id = user.following.values_list("user__id", flat=True)

        return self.filter(
            Q(user__id__in =follow_users_id) | 
            Q(user = user)
        ).distinct().order_by("-timestamp")

class TweetManager(models.Manager):
    def get_queryset(self,*args, **kwargs):

        return TweetQuerySet(self.model, using=self._db)


    def feed(self,user):
        return self.get_queryset().feed(user)

class LikeTweet (models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet",on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class Tweet(models.Model):
    parent = models.ForeignKey("self", null= True, on_delete= models.SET_NULL)
    content = models.TextField(null=True,blank=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    like = models.ManyToManyField(User,related_name="tweet_user", through=LikeTweet, blank=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='tweets')
    timestamp = models.DateTimeField(auto_now_add=True)


    objects = TweetManager()

   
    def __str__(self):
        return self.content
    class Meta:
        ordering = ['-id']
    @property
    def is_retweet(self):
        return self.parent != None

    def serialize(self):
        '''Feel free to delete'''
        return {
            "id" : self.id,
            "content" : self.content,
            "like" : random.randint(1,120)
        }