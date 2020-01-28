from django.db import models
from accounts.models import User
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

class Event(models.Model):
  """
  TODO: ADD DOCSTRINGS
        ADD Extra Info Fields
  """
  created_at = models.DateTimeField(auto_now_add=True)
  public = models.BooleanField(default=True)

  EVENTS_TYPE_CHOICES = [
    ('ED', 'Evento Distrital'),
    ('EAIRAUP', 'Evento AIRAUP'),
    ('FD', 'Foro Distrital')
  ]
  type = models.CharField(max_length=3,choices=EVENTS_TYPE_CHOICES, blank=False)

  title = models.CharField(max_length=100, blank=False)

  short_description= models.CharField(max_length=150, blank=False)
  
  start_date = models.DateTimeField(blank=False)
  end_date = models.DateTimeField(blank=False)

  inscriptions = models.SmallIntegerField(default=0)
  max_inscriptions = models.SmallIntegerField(blank= False)

  def __str__(self):
    return self.title

class Inscription(models.Model):
  """
    TODO: ADD DOCSTRINGS
  """
  STATUS_CHOICES = [
    ('pending', 'pending'),
    ('approved', 'approved'),
    ('cancelled', 'cancelled'),
    ('deny', 'deny')
  ]
  created_at = models.DateTimeField(auto_now_add=True)
  
  event = models.ForeignKey(Event,null=False, on_delete=models.CASCADE)
  user = models.ForeignKey(User,null=False, on_delete=models.CASCADE)
  
  status = models.CharField(max_length=9, default="pending", choices=STATUS_CHOICES)
  message = models.CharField(max_length=150, null=True, blank=True)

  def __str__(self):
    return self.user.username
