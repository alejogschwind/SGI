from django.urls import path, re_path
from rest_framework import routers
from .models import (
  Profile,
  Personal,
  MedicalRecord,
  EmergencyContact,
  Institutional,
)
from .serializers import (
  PersonalSerializer,
  ProfileSerializer,
  MedicalRecordSerializer,
  EmergencyContactSerializer,
  InstitutionalSerializer,
)
from .views import (
  InstitutionalRetrieveUpdate,
  EmergencyContactRetrieveUpdate,
  MedicalRecordRetrieveUpdate,
  PersonalRetrieveUpdate,
  ProfileRetrieveUpdate,
  ProfileList,
  UserDetailRDRView
)

urlpatterns = [
  path('adm/accounts/<pk>', UserDetailRDRView.as_view(), name="user-retrieve"),
  
  path('accounts/institutional/<pk>', InstitutionalRetrieveUpdate.as_view(queryset=Institutional.objects.all(), serializer_class=InstitutionalSerializer), name="institutional-retrive-update"),
  path('accounts/emergency-contact/<pk>', EmergencyContactRetrieveUpdate.as_view(queryset=EmergencyContact.objects.all(), serializer_class=EmergencyContactSerializer), name="emergency-contact-retrive-update"),
  path('accounts/medical/<pk>', MedicalRecordRetrieveUpdate.as_view(queryset=MedicalRecord.objects.all(), serializer_class=MedicalRecordSerializer), name="medical-retrive-update"),
  path('accounts/personal/<pk>', PersonalRetrieveUpdate.as_view(queryset=Personal.objects.all(), serializer_class=PersonalSerializer), name="personal-retrive-update"),
  path('accounts/profile/', ProfileList.as_view(queryset=Profile.objects.all(), serializer_class=ProfileSerializer), name="profile-retrieve-update"),
  path('accounts/profile/<pk>', ProfileRetrieveUpdate.as_view(queryset=Profile.objects.all(), serializer_class=ProfileSerializer), name="profile-retrieve-update"),
]