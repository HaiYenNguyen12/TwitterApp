
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (home_view, tweet_detail_view, tweet_view_list,
tweet_create_view, tweet_delete_view,tweet_action_view)
urlpatterns = [

    path('',tweet_view_list),
    path('create/',tweet_create_view),
    path('action/',tweet_action_view),
    path('<int:tweet_id>/',tweet_detail_view),
    path('<int:tweet_id>/delete/',tweet_delete_view),
    
]


if settings.DEBUG:
    urlpatterns +=static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

