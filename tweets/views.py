from django.http import JsonResponse,HttpResponseRedirect
from django.shortcuts import render,redirect
from .models import Tweet
from .forms import TweetForm
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import TweetSerializer
from django.utils.http import url_has_allowed_host_and_scheme
from django.conf import settings


ALLOW_HOST = settings.ALLOWED_HOSTS



def home_view (request, *args, **kwargs):
    return render(request,"pages/home.html",context={},status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):
    serializer = TweetSerializer(data=request.POST)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user = request.user)
        return Response(serializer.data, status = 201)
    return Response({}, status = 400)

@api_view(['GET'])
def tweet_view_list(request, *args, **kwargs):
     list = Tweet.objects.all()
     serializer = TweetSerializer(list,many = True)
     return Response(serializer.data)

@api_view(['GET'])
def tweet_detail_view(request,tweet_id, *args, **kwargs):
    object = Tweet.objects.filter(id = tweet_id)
    if not object.exists():
        return Response({}, status = 404)
    
    serializer = TweetSerializer(object.first())
    return Response(serializer.data, status=200)


@api_view(['GET','DELETE'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request,tweet_id, *args, **kwargs):
    object = Tweet.objects.filter(id = tweet_id)
    if not object.exists():
        return Response({"message":"The tweet does not exist!!"}, status = 404)
    object = object.filter(user = request.user)
    if not object.exists():
        return Response({"message":"The tweet can not delete!!"}, status = 404)
    object = object.first()
    object.delete()
    return Response({"message":"The tweet is deleted sucessfully !!"}, status=200)







def tweet_create_view_pure_django(request, *args, **kwargs):
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None
    print(next_url)
    if form.is_valid:
        obj = form.save(commit=False)
        obj.save()
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse(obj.serialize(),status=201)
        if next_url != None and url_has_allowed_host_and_scheme(next_url,ALLOW_HOST):
            print("OK")
            return redirect(next_url)
        form = TweetForm()
    
    if form.errors:
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse(form.errors, status = 400)

    return render(request, "components/form.html", context={"form": form})




def tweet_view_list_pure_django(request, *args, **kwargs):
    list = Tweet.objects.all()
    t_list = [x.serialize() for x in list]
    data =  {
        "response" : t_list
    }
    return JsonResponse(data)


def tweet_detail_view_pure_django(request, tweet_id, *args, **kwargs):
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

