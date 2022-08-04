
from django.shortcuts import render,redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.conf import settings
from ..serializers import PublicProfileSerializer
from ..models import Profile

User = get_user_model()
ALLOW_HOST = settings.ALLOWED_HOSTS
@api_view(['GET'])
def profile_detail_api_view(request, username, *args, **kwargs):
    # get the profile for the passed username
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        return Response({"detail": "User not found"}, status=404)
    profile_obj = qs.first()
    data = PublicProfileSerializer(instance=profile_obj, context = {"request":request})
    return Response(data.data, status=200)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def user_follow_view(request, username,  *args, **kwargs):
    me = request.user
    other_user_qs = User.objects.filter(username = username)

    if me.username == username:
        count = {
            "count" : me.profile.follower.all().count()
        }
        return Response(count, status = 400)


    if other_user_qs.exists():
        other = other_user_qs.first()
        profile = other.profile
        data = request.data or {}
        action = data.get("action")
        if action == "follow":
            profile.follower.add(me)
        elif action == "unfollow":
            profile.follower.remove(me)
        else:
            pass
        count = {
            "count" : profile.follower.all().count()
        }
        return Response(count, status = 400)
    else:
        return Response({}, status=400)





