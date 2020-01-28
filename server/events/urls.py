from django.urls import path
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from .models import (
  Event,
  Inscription
)
from .serializers import (
  EventSerializer,
  InscriptionSerializer
)
from .views import (
  EventAdminView,
  EventDetailUpdateAdminView,
  EventView,
  EventDetailView,
  InscriptionAdminView,
  InscriptionDetailUpdateAdminView,
  InscriptionView,
  InscriptionDetailView,
)

urlpatterns = [
  # Admin URLs must be a special type of user.
  path('adm/inscriptions/', InscriptionAdminView.as_view()),
  path('adm/inscriptions/<int:id>', InscriptionDetailUpdateAdminView.as_view()),
  path('adm/events/', EventAdminView.as_view()),
  path('adm/events/<int:id>', EventDetailUpdateAdminView.as_view()),
  # SRC URLs 
  path('events/', EventView.as_view()),
  path('events/<int:id>', EventDetailView.as_view()),
  path('inscriptions/', InscriptionView.as_view()),
  path('inscriptions/<int:id>', InscriptionDetailView.as_view())
]