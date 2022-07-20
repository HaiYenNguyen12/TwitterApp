import random
from django.db import models
from django.conf import settings

# Create your models here.

User = settings.AUTH_USER_MODEL


class LikeTweet (models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet",on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class Tweet(models.Model):
    parent = models.ForeignKey("self", null= True, on_delete= models.SET_NULL)
    content = models.TextField(null=True,blank=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    like = models.ManyToManyField(User,related_name="tweet_user", through=LikeTweet, blank=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
   
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