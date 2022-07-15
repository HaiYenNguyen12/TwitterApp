from dataclasses import fields
from rest_framework import serializers

from tweetme2.settings import MAX_LENGTH

from .models import Tweet
from django.conf import settings

MAX_LENGTH = settings.MAX_LENGTH

class TweetSerializer(serializers.ModelSerializer):
    class Meta:

        model = Tweet
        fields = ['content']

    def validate_content(self, content):
        if len(content) > MAX_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        else:
            return content