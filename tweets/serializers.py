from dataclasses import fields
from rest_framework import serializers

from tweetme2.settings import MAX_LENGTH


from profiles.serializers import PublicProfileSerializer
from .models import Tweet

from django.conf import settings



MAX_LENGTH = settings.MAX_LENGTH

TWEET_ACTION_OPTIONS  = settings.TWEET_ACTION_OPTIONS



class TweetActionSerializer ( serializers.Serializer):
    id = serializers.IntegerField()
    action  = serializers.CharField()
    content = serializers.CharField(allow_blank = True, required =  False)

    def validate_action (self, value):
        value = value.lower().strip()
        if not value in TWEET_ACTION_OPTIONS:
            return serializers.ValidationError("This is not a valid action!")
        else:
            return value

class TweetCreateSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile' , read_only = True)
    like = serializers.SerializerMethodField(read_only=True)
    class Meta:

        model = Tweet
        fields = ['user', 'id', 'content', 'like', 'timestamp']

    def get_like(self,obj):
        return obj.like.count()

    def validate_content(self, content):
        if len(content) > MAX_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        else:
            return content


class TweetSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile', read_only=True)
    like = serializers.SerializerMethodField(read_only=True)
    parent = TweetCreateSerializer(read_only = True)
    
    class Meta:

        model = Tweet
        fields = [
                'user', 
                'id', 
                'content',
                'like',
                'is_retweet',
                'parent',
                'timestamp']

    def get_like(self,obj):
        return obj.like.count()

    # def get_content(self, obj):
        
    #     content = obj.content
    #     if obj.is_retweet:
    #         content = obj.parent.content
    #     return content

