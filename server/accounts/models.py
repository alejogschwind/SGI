from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from allauth.account.signals import user_signed_up

# Celery 
from .task import send_email_verification

class User(AbstractUser):
  """
  TODO: ADD DOCSTRINGS
  """
  USERS_TYPE_CHOICES = [
    ('RDR', 'Representante Distrital Rotaract'),
    ('PCR', 'Presidente Club Rotaract'),
    ('SCR', 'Socio Club Rotaract')
  ]
  type = models.CharField(max_length=3,choices=USERS_TYPE_CHOICES, default="SCR")

  def __str__(self):
    return self.username

class Personal(models.Model):
  user = models.OneToOneField(
    User,
    primary_key=True,
    verbose_name="user",
    related_name="personal",
    on_delete=models.CASCADE
  )

  first_name = models.CharField(max_length=40, null=True)
  last_name = models.CharField(max_length=40, null=True)
  gender = models.CharField(max_length=1, null=True)
  birthdate = models.DateField(null=True)
  passport = models.CharField(max_length=12, null=True)
  prefix = models.CharField(max_length=4, null=True)
  phone_number = models.CharField(max_length=20, null=True)
  job = models.CharField(max_length=50, null=True)

  def __str__(self):
    return self.user.username

class Profile(models.Model):
  user = models.OneToOneField(
    User,
    primary_key=True,
    verbose_name='user',
    related_name='profile',
    on_delete=models.CASCADE
  )

  avatar = models.ImageField(upload_to='profile_image', blank=True)

  bio = models.CharField(max_length=200, blank=True, null=True)

  def __str__(self):
    return self.user.username

class MedicalRecord(models.Model):
  user = models.OneToOneField(
    User,
    primary_key=True,
    verbose_name='user',
    related_name='medical_record',
    on_delete=models.CASCADE
  )
  health_insurance = models.CharField(max_length=30, null=True)
  affiliate_number = models.CharField(max_length=30, null=True)
  blood_type = models.CharField(max_length=3, null=True)

  have_allergy = models.BooleanField(null=True)
  have_medication = models.BooleanField(null=True)
  have_periodic_treatment = models.BooleanField(null=True)
  have_physical_limitation = models.BooleanField(null=True)
  have_special_diet = models.BooleanField(null=True)
  have_surgeries = models.BooleanField(null=True)
  have_additional = models.BooleanField(null=True)

  allergy_obs = models.CharField(max_length=80, blank=True, null=True);
  diet_obs = models.CharField(max_length=80, blank=True, null=True);
  medication_obs = models.CharField(max_length=80, blank=True, null=True);
  treatment_obs = models.CharField(max_length=80, blank=True, null=True);
  limitation_obs = models.CharField(max_length=80, blank=True, null=True);
  surgeries_obs = models.CharField(max_length=80, blank=True, null=True);
  additional_obs = models.CharField(max_length=80, blank=True, null=True);

  def __str__(self):
    return self.user.username

class Address(models.Model):
  user = models.ForeignKey(
    User,
    verbose_name='user',
    related_name='address',
    on_delete=models.CASCADE
  )

  def __str__(self):
    return self.user.username

class EmergencyContact(models.Model):
  user = models.OneToOneField(
    User,
    primary_key=True,
    verbose_name='user',
    related_name='emergency_contact',
    on_delete=models.CASCADE
  )
  
  first_name = models.CharField(max_length=40, null=True)
  last_name = models.CharField(max_length=40, null=True)
  relationship = models.CharField(max_length=20, null=True)
  prefix = models.CharField(max_length=4, null=True)
  phone_number = models.CharField(max_length=20, null=True)

  def __str__(self):
    return self.user.username

class Institutional(models.Model):
  user = models.OneToOneField(
    User,
    primary_key=True,
    verbose_name='user',
    related_name='institutional',
    on_delete=models.CASCADE
  )

  weel = models.CharField(max_length=20, null=True)
  airaup_commission = models.CharField(max_length=20, null=True)
  airaup_position = models.CharField(max_length=20, null=True)
  club = models.CharField(max_length=40, null=True)
  club_position = models.CharField(max_length=20, null=True)
  district = models.CharField(max_length=6, null=True)
  district_position = models.CharField(max_length=20, null=True)

  def __str__(self):
    return self.user.username

@receiver(user_signed_up)
def set_initial_user_names(request, user, **kwargs):
  # send_email_verification.delay()

  profile = Profile(user=user)
  profile.save()

  personal = Personal(user=user)
  personal.save()

  medical_record = MedicalRecord(user=user)
  medical_record.save()

  emergency_contact = EmergencyContact(user=user)
  emergency_contact.save()

  institutional = Institutional(user=user)
  institutional.save()

  user.save()
