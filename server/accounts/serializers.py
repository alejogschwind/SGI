from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Profile, MedicalRecord, Personal, EmergencyContact, Institutional

class PersonalSerializer(serializers.ModelSerializer):
    
    birthdate= serializers.DateField(format='%d/%m/%y', input_formats=['%d/%m/%y'])
    class Meta:
        model = Personal
        fields = ['first_name',
                 'last_name',
                 'gender',
                 'birthdate',
                 'passport',
                 'prefix',
                 'phone_number',
                 'job'
        ]

class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = [
                 'first_name',
                 'last_name',
                 'relationship',
                 'prefix',
                 'phone_number',
        ]

class InstitutionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institutional
        fields = [
                 'weel',
                 'airaup_commission',
                 'airaup_position',
                 'club',
                 'club_position',
                 'district',
                 'district_position',
        ]

class MedicalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalRecord
        fields = [
                 'health_insurance',
                 'affiliate_number',
                 'blood_type',
                 'have_allergy',
                 'have_medication',
                 'have_periodic_treatment',
                 'have_physical_limitation',
                 'have_special_diet',
                 'have_surgeries',
                 'have_additional',
                 'allergy_obs',
                 'diet_obs',
                 'medication_obs',
                 'treatment_obs',
                 'limitation_obs',
                 'surgeries_obs',
                 'additional_obs',
        ]

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ['bio', 'avatar']

UserModel = get_user_model()
class UserDetailsSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """
    profile = ProfileSerializer(read_only=True)
    personal = PersonalSerializer(read_only=True)
    medical_record = MedicalRecordSerializer(read_only=True) 
    institutional = InstitutionalSerializer(read_only=True) 
    emergency_contact = EmergencyContactSerializer(read_only=True) 
    class Meta:
        model = UserModel
        fields = ('pk', 'type', 'username', 'email', 'profile', 'personal', 'medical_record', 'emergency_contact', 'institutional')
        read_only_fields = ('email', 'username', 'type')