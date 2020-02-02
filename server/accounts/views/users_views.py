from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import get_object_or_404
from accounts.models import User
from accounts.serializers import UserDetailsSerializer


class UserDetailRDRView(APIView):

  def get(self, request, pk=None):
    if request.user.type == 'RDR':
      instance = get_object_or_404(User, pk=pk)
      serializer = UserDetailsSerializer(instance)
      return Response(serializer.data, status=200)
    return Response({'user': "You don't have premissions to preform this action."}, status=401)
 

