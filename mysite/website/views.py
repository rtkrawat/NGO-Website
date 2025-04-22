from django.shortcuts import render, redirect

# Create your views here.

def index(request):
    return render(request, 'home/index.html')

def about(request):
    return render(request, 'home/aboutus.html')

def register(request):
    return render(request, 'home/register.html')

def login_view(request):
    return render(request, 'home/login01.html')

def projects(request):
    return render(request, 'home/projects.html')

def events(request):
    return render(request, 'home/events.html')

def certificates(request):
    return render(request, 'home/certificates.html')

def volunteer(request):
    return redirect('register')

def donate(request):
    # For now, just redirect to the index page
    return render(request, 'home/index.html')


