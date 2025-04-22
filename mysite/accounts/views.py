from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.urls import reverse
from .forms import UserRegistrationForm, UserLoginForm, UserProfileForm, NGOProfileForm
from .models import UserProfile
from django.contrib.auth.models import User

# Create your views here.

def register_view(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            user_type = form.cleaned_data.get('user_type')
            
            # Update the UserProfile with user type
            profile = UserProfile.objects.get(user=user)
            profile.user_type = user_type
            profile.save()
            
            # Log in the user after registration
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=user.username, password=raw_password)
            login(request, user)
            
            # Redirect to profile setup page based on user type
            if user_type == 'ngo':
                return redirect('ngo_profile_setup')
            else:
                return redirect('volunteer_profile_setup')
    else:
        form = UserRegistrationForm()
    
    return render(request, 'accounts/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = UserLoginForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f"Welcome back, {username}!")
                return redirect('dashboard')
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    else:
        form = UserLoginForm()
    
    return render(request, 'accounts/login.html', {'form': form})

def logout_view(request):
    logout(request)
    messages.info(request, "You have successfully logged out.")
    return redirect('index')

@login_required
def volunteer_profile_setup(request):
    profile = request.user.profile
    
    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, "Your profile has been updated successfully!")
            return redirect('dashboard')
    else:
        form = UserProfileForm(instance=profile)
    
    return render(request, 'accounts/volunteer_profile_setup.html', {'form': form})

@login_required
def ngo_profile_setup(request):
    profile = request.user.profile
    
    if request.method == 'POST':
        form = NGOProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, "Your organization profile has been updated successfully!")
            return redirect('dashboard')
    else:
        form = NGOProfileForm(instance=profile)
    
    return render(request, 'accounts/ngo_profile_setup.html', {'form': form})

@login_required
def profile_view(request):
    return render(request, 'accounts/profile.html')

@login_required
def dashboard(request):
    user_type = request.user.profile.user_type
    if user_type == 'ngo':
        return render(request, 'accounts/ngo_dashboard.html')
    else:
        return render(request, 'accounts/volunteer_dashboard.html')

@login_required
def edit_profile(request):
    profile = request.user.profile
    user_type = profile.user_type
    
    if request.method == 'POST':
        if user_type == 'ngo':
            form = NGOProfileForm(request.POST, request.FILES, instance=profile)
        else:
            form = UserProfileForm(request.POST, request.FILES, instance=profile)
            
        if form.is_valid():
            form.save()
            messages.success(request, "Your profile has been updated successfully!")
            return redirect('profile')
    else:
        if user_type == 'ngo':
            form = NGOProfileForm(instance=profile)
        else:
            form = UserProfileForm(instance=profile)
    
    return render(request, 'accounts/edit_profile.html', {'form': form})
