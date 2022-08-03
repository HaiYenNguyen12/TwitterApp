from cProfile import Profile
import imp
from django.shortcuts import render,redirect
from django.http import Http404
from django.urls import is_valid_path
from .models import Profile
from .forms import ProfileForm

def profile_update_view ( request, *args, **kwargs):
    if not request.user.is_authenticated:
        redirect("/login?next=/profile/update")
    user = request.user
    user_data = {
        "first_name" : user.first_name,
        "last_name" : user.last_name,
        "email" : user.email,
    }
    my_profile = user.profile
    form = ProfileForm(request.POST or None, initial=user_data, instance=my_profile)
    if form.is_valid():
        profile_obj = form.save(commit=False)
        user.first_name = form.cleaned_data.get("first_name")
        user.last_name = form.cleaned_data.get("last_name")
        user.email = form.cleaned_data.get("email")

        user.save()
        profile_obj.save()

    context = {
        "form": form,
        "btn_label": "Save",
        "title": "Update Profile"
    }
    return render(request, "profiles/form.html", context)




def profile_detail_view (request,username, *args, **kwargs):

    qs = Profile.objects.filter(user__username = username)
    if qs.exists():
        profile = qs.first()
        context = {
            "username":username,
            "profile" : profile

        }
    else:
        raise Http404
    return render(request, "profiles/detail.html", context=context)