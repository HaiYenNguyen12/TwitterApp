from django.http import JsonResponse
from django.shortcuts import render
from .models import Tweet
import random
from .forms import TweetForm
def home_view (request, *args, **kwargs):
    return render(request,"pages/home.html",context={},status=200)

def tweet_create_view(request, *args, **kwargs):

    form = TweetForm(request.POST or None)
    if form.is_valid:
        obj = form.save(commit=False)
        obj.save()
        form = TweetForm()
    return render(request, "components/form.html", context={"form": form})
def tweet_view_list(request, *args, **kwargs):
    list = Tweet.objects.all()
    t_list = [{"id": x.id, "content": x.content,"likes": random.randint(1,101)}for x in list]
    data =  {
        "response" : t_list
    }
    return JsonResponse(data)


def tweet_detail_view(request, tweet_id, *args, **kwargs):
    """
    REST API VIEW
    Comsume by JS or Swift/Java/iOS/Android
    return json data
    """
    data = {
        "id" : tweet_id
    }
    status = 200

    try:
        object = Tweet.objects.get(id = tweet_id)
        data["content"] = object.content
        
    
    except:
        data["message"] = "Ko tim thay"
        status = 404
    
    return JsonResponse(data,status=status)

