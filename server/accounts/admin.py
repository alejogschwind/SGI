from django.contrib import admin
from django.contrib.auth.models import Group
from .models import User, Profile, Personal, MedicalRecord, EmergencyContact, Institutional

admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Personal)
admin.site.register(MedicalRecord)
admin.site.register(EmergencyContact)
admin.site.register(Institutional)
admin.site.unregister(Group)