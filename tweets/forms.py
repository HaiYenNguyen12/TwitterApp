from dataclasses import field
import imp
from django import forms

from .models import Tweet

from django.conf import settings

MAX_LENGTH  = settings.MAX_LENGTH

class TweetForm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ['content']

    def clean_content(self):
        content = self.cleaned_data.get("content")
        if len(content) > MAX_LENGTH:
            raise forms.ValidationError("This tweet is too long")
        else:
            return content
