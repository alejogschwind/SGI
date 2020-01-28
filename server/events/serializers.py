from rest_framework import serializers
from .models import Event, Inscription
from accounts.models import User
from accounts.serializers import UserDetailsSerializer
from api import settings

class EventSerializer(serializers.ModelSerializer):

  start_date = serializers.DateTimeField(format=settings.DATETIME_FORMAT)
  end_date = serializers.DateTimeField(format=settings.DATETIME_FORMAT)

  class Meta:
    model = Event
    # fields = '__all__'
    fields = [
      'pk',
      'created_at',
      'start_date',
      'end_date',
      'title',
      'type',
      'short_description',
      'inscriptions',
      'max_inscriptions',
      'public'
    ]
    read_only_fields = ['pk', 'created_at', 'inscriptions']


class InscriptionSerializer(serializers.ModelSerializer):
  event = EventSerializer(many=False)
  user = UserDetailsSerializer(many=False)
  class Meta:
    model = Inscription
    fields = [
      'pk',
      'created_at',
      'event',
      'user',
      'status',
      'message'
    ]
    read_only_fields = ['pk', 'created_at', 'user', 'event']
    depth = 1

class InscriptionCreateSerializer(serializers.ModelSerializer):

  user = serializers.PrimaryKeyRelatedField(
    queryset = User.objects.all(),
    required = True,
  )
  event = serializers.PrimaryKeyRelatedField(
    queryset = Event.objects.filter(public=True),
    required = True,
  )

  class Meta:
    model = Inscription
    fields = [
      'pk',
      'created_at',
      'event',
      'user',
      'status',
      'message'
    ]
    read_only_fields = ['pk', 'created_at', 'user', 'event']