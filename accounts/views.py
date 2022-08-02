from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm



def login_view(request, *args, **kwargs):
    form = AuthenticationForm(request, data = request.POST or None)
    if form.is_valid():
        user_ = form.get_user()
        login(request,user_)
        return redirect("/")
    context = {
        "form" : form,
        "btn_label": "LOGIN",
        "title" : "Login"
    }

    return render(request, "accounts/auth.html", context=context)


def logout_view(request, *args, **kwargs):
    if request.method == "POST":
        logout(request)
        return redirect("/login")
    context = {
        "form" : None,
        "desc" : "Do you want to logout?",
        "btn_label": "LOGOUT",
        "title" : "Logout"
    }

    return render(request, "accounts/auth.html", context=context)


def register_view(request, *args, **kwargs):
    form = UserCreationForm(data = request.POST or None)
    if form.is_valid():
        user= form.save(commit=True)
        user.set_password(form.cleaned_data.get("password1"))
        login(request,user)
        return redirect("/")
    context = {
        "form" : form,
        "btn_label": "REGISTER",
        "title" : "Register"
    }

    return render(request, "accounts/auth.html", context=context)