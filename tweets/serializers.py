from dataclasses import fields
from rest_framework import serializers

from tweetme2.settings import MAX_LENGTH

from .models import Tweet
from django.conf import settings

MAX_LENGTH = settings.MAX_LENGTH

TWEET_ACTION_OPTIONS  = settings.TWEET_ACTION_OPTIONS



class TweetActionSerializer ( serializers.Serializer):
    id = serializers.IntegerField()
    action  = serializers.CharField()


    def validation_action (self, value):
        value = value.lower().strip()
        if not value in TWEET_ACTION_OPTIONS:
            return serializers.ValidationError("This is not a valid action!")
        else:
            return value

class TweetSerializer(serializers.ModelSerializer):
    like = serializers.SerializerMethodField(read_only=True)
    class Meta:

        model = Tweet
        fields = ['id','content','like']

    def get_like(self,obj):
        return obj.like.count()

    def validate_content(self, content):
        if len(content) > MAX_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        else:
            return content