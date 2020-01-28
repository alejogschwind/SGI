from rest_framework import generics, filters
from rest_framework.validators import UniqueValidator
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from accounts.models import User

from events.permissions import IsUserAuthenticated

from events.models import Inscription, Event
from events.serializers import (
  InscriptionSerializer,
  InscriptionCreateSerializer
)

class InscriptionAdminView(APIView):

  def get(self, request):
    if request.user.type == "RDR":
      inscriptions = Inscription.objects.all()
      serializer = InscriptionSerializer(inscriptions, many=True)
      return Response(serializer.data, status=200)
    return Response({'user': "You don't have premissions to preform this action."}, status=401)

class InscriptionDetailUpdateAdminView(APIView):

  def get(self, request, id=None):
    instance = get_object_or_404(Inscription, pk=id)
    if request.user.type == "RDR":
      serializer = InscriptionSerializer(instance)
      return Response(serializer.data, status=200)
    return Response({"error": "Given inscription not found."}, status=404)

  def patch(self, request, id=None):
    if request.user.type == 'RDR':
      instance = get_object_or_404(Inscription, pk=id)
      data = request.data
      # Change this TODO!!!
      data.pop('event', None)
      serializer = InscriptionCreateSerializer(instance, data, partial=True)
      if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=200)
    return Response({'user': "You don't have premissions to preform this action."}, status=401)

class InscriptionView(APIView):

  def get(self, request):
    inscriptions = Inscription.objects.filter(user=request.user.pk)
    serializer = InscriptionSerializer(inscriptions, many=True)
    return Response(serializer.data, status=200)

  def post(self, request):
    data = request.data
    data['user'] = request.user.id
    # Check if event exist
    # data['event'] = event
    serializer = InscriptionCreateSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
      # Ckeck if user is not allready inscript to event
      inscription = Inscription.objects.filter(user=request.user.id, event=data['event'])
      if inscription:

        return Response({'user': 'User already send the inscription request.'}, status=400)
      # Add inscription to counter.
      event = get_object_or_404(Event, pk=data['event'])
      serializer.save()
      event.inscriptions += 1
      event.save()
      return Response(serializer.data, status=201)

class InscriptionDetailView(APIView):

  def get(self, request, id=None):
    inscription = get_object_or_404(Inscription, pk=id)
    if inscription.user.id == request.user.id:
      serializer = InscriptionSerializer(inscription)
      return Response(serializer.data, status=200)
    return Response({"error": "Given inscription not found."}, status=404)
