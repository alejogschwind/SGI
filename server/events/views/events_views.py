from events.models import Event
from events.serializers import EventSerializer
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.views import APIView

class EventAdminView(APIView):
  
  def get(self, request):
    if request.user.type == 'RDR':
      events = Event.objects.all()
      serializer = EventSerializer(events, many=True)
      return Response(serializer.data, status=200)
    return Response({'user': "You don't have premissions to preform this action."}, status=401)

  def post(self, request):
    if request.user.type == 'RDR':
      data = request.data
      serializer = EventSerializer(data=data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
      return Response(serializer.errors, status=400)
    return Response({'user': "You don't have premissions to preform this action."}, status=401)

class EventDetailUpdateAdminView(APIView):

  def get(self, request, id=None):
    if request.user.type == 'RDR':
      instance = get_object_or_404(Event, pk=id)
      serializer = EventSerializer(instance)
      return Response(serializer.data, status=200)
    return Response({'user': "You don't have premissions to preform this action."}, status=401)

  def put(self, request, id=None):
    if request.user.type == 'RDR':
      instance = get_object_or_404(Event, pk=id)
      serializer = EventSerializer(instance, request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
      return Response(serializer,errors, status=400)
    return Response({'user': "You don't have premissions to preform this action."}, status=401)
    
  def patch(self, request, id=None):
    if request.user.type == 'RDR':
      instance = get_object_or_404(Event, pk=id)
      serializer = EventSerializer(instance, request.data, partial=True)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
      return Response(serializer.errors, status=400)
    return Response({'user': "You don't have premissions to preform this action."}, status=401)

class EventView(APIView):

  def get(self, request):
    events = Event.objects.filter(public=True)
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data, status=200)

class EventDetailView(APIView):

  def get(self, request, id=None):
    instance = get_object_or_404(Event, pk=id)
    if not instance.public:
      return Response({"error": "Given event not found."}, status=404)
    serializer = EventSerializer(instance)
    return Response(serializer.data, status=200)

