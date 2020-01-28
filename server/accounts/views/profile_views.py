# REST Framework
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes
# Permissions
from accounts.permissions import IsOwner
# Models
from accounts.models import Profile
# Serializers
from accounts.serializers import ProfileSerializer

@permission_classes([IsAuthenticated,IsOwner])
class ProfileRetrieveUpdate(generics.RetrieveUpdateAPIView):
    """
    Vista generica del modelo Profile, encargada de devolver y actualizar
    los datos del modelo. Permiso otorgado a usuarios autenticados y dueños de los datos.
    -
    Documentación de relevancia:
    * https://www.django-rest-framework.org/api-guide/generic-views/#retrieveupdateapiview
    * https://www.django-rest-framework.org/api-guide/permissions/#isauthenticated
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

@permission_classes([IsAdminUser])
class ProfileList(generics.ListAPIView):
    """ TODO: Actualizar permisos a diferentes tipos de usuarios (RDR, Presidente, Socio, Invitados).
    Vista generica del modelo Profile, encargada de listar
    los datos del modelo. Permiso otorgado a usuarios Administradores. 
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer