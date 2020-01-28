# REST Framework
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes
# Permissions
from accounts.permissions import IsOwner
# Models
from accounts.models import Personal
# Serializers
from accounts.serializers import PersonalSerializer

@permission_classes([IsAuthenticated,IsOwner])
class PersonalRetrieveUpdate(generics.RetrieveUpdateAPIView):
    """
    Vista generica del modelo Personal, encargada de devolver y actualizar
    los datos del modelo. Permiso otorgado a usuarios autenticados y dueños de los datos.
    -
    Documentación de relevancia:
    * https://www.django-rest-framework.org/api-guide/generic-views/#retrieveupdateapiview
    * https://www.django-rest-framework.org/api-guide/permissions/#isauthenticated
    """
    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer