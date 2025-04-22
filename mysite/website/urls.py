from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('projects/', views.projects, name='projects'),
    path('events/', views.events, name='events'),
    path('certificates/', views.certificates, name='certificates'),
    path('volunteer/', views.volunteer, name='volunteer'),
    path('donate/', views.donate, name='donate'),
] 