from django.urls import path, re_path
from rest_framework import routers
from .models import (
  Profile,
  Personal,
  MedicalRecord,
  EmergencyContact,
  Institutional
)
from .serializers import (
  PersonalSerializer,
  ProfileSerializer,
  MedicalRecordSerializer,
  EmergencyContactSerializer,
  InstitutionalSerializer
)
from .views import (
  InstitutionalRetrieveUpdate,
  EmergencyContactRetrieveUpdate,
  MedicalRecordRetrieveUpdate,
  PersonalRetrieveUpdate,
  ProfileRetrieveUpdate,
  ProfileList
)

urlpatterns = [
  path('institutional/<pk>', InstitutionalRetrieveUpdate.as_view(queryset=Institutional.objects.all(), serializer_class=InstitutionalSerializer), name="institutional-retrive-update"),
  path('emergency-contact/<pk>', EmergencyContactRetrieveUpdate.as_view(queryset=EmergencyContact.objects.all(), serializer_class=EmergencyContactSerializer), name="emergency-contact-retrive-update"),
  path('medical/<pk>', MedicalRecordRetrieveUpdate.as_view(queryset=MedicalRecord.objects.all(), serializer_class=MedicalRecordSerializer), name="medical-retrive-update"),
  path('personal/<pk>', PersonalRetrieveUpdate.as_view(queryset=Personal.objects.all(), serializer_class=PersonalSerializer), name="personal-retrive-update"),
  path('profile/', ProfileList.as_view(queryset=Profile.objects.all(), serializer_class=ProfileSerializer), name="profile-retrieve-update"),
  path('profile/<pk>', ProfileRetrieveUpdate.as_view(queryset=Profile.objects.all(), serializer_class=ProfileSerializer), name="profile-retrieve-update"),
]