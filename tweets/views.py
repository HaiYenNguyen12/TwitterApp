from django.shortcuts import render
from django.conf import settings


ALLOW_HOST = settings.ALLOWED_HOSTS


def home_view (request, *args, **kwargs):
    username = None
    if request.user.is_authenticated:
        username = request.user.username

    return render(request,"pages/home.html",context={"username":username},status=200)

def list_view(request, *args, **kwargs):
    return render(request, "tweets/list.html")

def detail_view(request,tweet_id, *args, **kwargs):
    print(tweet_id)
    return render(request, "tweets/detail.html",context={"tweet_id": tweet_id})






        
        
        








