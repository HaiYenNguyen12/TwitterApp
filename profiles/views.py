from cProfile import Profile
from django.shortcuts import render
from django.http import Http404
from .models import Profile

def profile_detail_view (request,username, *args, **kwargs):

    qs = Profile.objects.filter(user__username = username)
    if qs.exists():
        profile = qs.first()
        context = {
            "username":username,
            "profile" : profile

        }
    else:
        raise Http404
    return render(request, "profiles/detail.html", context=context)