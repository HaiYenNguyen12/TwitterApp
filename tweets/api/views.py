
from multiprocessing import context
from django.http import  JsonResponse,HttpResponseRedirect
from django.shortcuts import render,redirect
from ..models import Tweet
from ..forms import TweetForm
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from ..serializers import TweetSerializer, TweetActionSerializer,TweetCreateSerializer
from django.utils.http import url_has_allowed_host_and_scheme
from django.conf import settings


ALLOW_HOST = settings.ALLOWED_HOSTS


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):
    serializer = TweetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user = request.user)
        return Response(serializer.data, status = 201)
    return Response({}, status = 400)


def get_paginated_queryset_response(qs, request):
        paginator = PageNumberPagination()
        paginator.page_size = 20
        paginated_qs = paginator.paginate_queryset(qs, request)
        serializer = TweetSerializer(paginated_qs, many=True, context = {"request" : request})
        return paginator.get_paginated_response(serializer.data) # Response( serializer.data, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tweet_view_feed(request, *args, **kwargs):
    user = request.user
    qs = Tweet.objects.feed(user)
    return get_paginated_queryset_response(qs, request)


@api_view(['GET'])
def tweet_view_list(request, *args, **kwargs):
     list = Tweet.objects.all()
     username = request.GET.get("username")
     if username != None:
        list = list.by_username(username)
     return get_paginated_queryset_response(list, request)



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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    '''
    Action like, unlike, retweet ...
    '''
    print(request.POST, request.data)
   
    serializer = TweetActionSerializer(data = request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get("id")
        action = data.get("action")
        content =  data.get("content")
        print(content,tweet_id, action)

        object = Tweet.objects.filter(id = tweet_id)
        if not object.exists():
            return Response({"message":"The tweet does not exist!!"}, status = 404)
        object = object.first()

        if action == "like":
            print(request.user)
            object.like.add(request.user)
            serializer = TweetSerializer(object)
            return Response(serializer.data, status=200)
        elif action == "unlike":
            object.like.remove(request.user)
            serializer = TweetSerializer(object)
            return Response(serializer.data, status=200)
        elif action == "retweet":
            new_tweet =  Tweet.objects.create(parent = object, content = content, user = request.user)
            serializer  = TweetSerializer(new_tweet)
            print("hihi")
            print(serializer.data,"hihi")
            return Response(serializer.data, status=201)
    return Response({}, status = 200) 
        
        
        






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

