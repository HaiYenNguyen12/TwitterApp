from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (user_follow_view, profile_detail_api_view)
urlpatterns = [
    path('<str:username>/',profile_detail_api_view),
    path('<str:username>/follow',user_follow_view),

    
]


if settings.DEBUG:
    urlpatterns +=static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

