from django.http import JsonResponse,HttpResponseRedirect
from django.shortcuts import render,redirect
from .models import Tweet
import random
from .forms import TweetForm
from django.utils.http import url_has_allowed_host_and_scheme
from django.conf import settings

ALLOW_HOST = settings.ALLOWED_HOSTS



def home_view (request, *args, **kwargs):
    return render(request,"pages/home.html",context={},status=200)




def tweet_create_view(request, *args, **kwargs):
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None
    print(next_url)
    if form.is_valid:
        obj = form.save(commit=False)
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(),status=201)
        if next_url != None and url_has_allowed_host_and_scheme(next_url,ALLOW_HOST):
            return redirect(next_url)
        form = TweetForm()
    return render(request, "components/form.html", context={"form": form})




def tweet_view_list(request, *args, **kwargs):
    list = Tweet.objects.all()
    t_list = [x.serialize() for x in list]
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

