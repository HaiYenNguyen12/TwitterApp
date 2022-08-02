"""tweetme2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from distutils.log import Log
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from accounts.views import ( login_view,
logout_view,
register_view)
from tweets.views import (  detail_view,
list_view,profile_view)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', list_view),
    path('login/', login_view),
    path('logout/', logout_view),
    path('register/', register_view),
    path('<int:tweet_id>/', detail_view),
    path('profile/<str:username>', profile_view),
    path('api/tweets/', include('tweets.api.urls'))
]

