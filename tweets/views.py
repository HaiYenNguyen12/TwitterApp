from django.http import JsonResponse
from django.shortcuts import render
from tweets.models import Tweet

def home_view (request, *args, **kwargs):
    return render(request,"pages/home.html",context={},status=200)




def tweet_view_list(request, *args, **kwargs):
    pass

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

