from dataclasses import field
from django import forms

from .models import Tweet

MAX_LENGTH  = 250

class TweetForm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ['content']

    def clean_tweet(self):
        content = self.cleaned_data.get("content")
        if content > MAX_LENGTH:
            raise forms.ValidationError("This tweet is too long")
        else:
            return content
