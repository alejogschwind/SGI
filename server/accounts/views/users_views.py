

# class UserDetailsView(RetrieveUpdateAPIView):
#     """
#     Reads and updates UserModel fields
#     Accepts GET, PUT, PATCH methods.
#     Default accepted fields: username, first_name, last_name
#     Default display fields: pk, username, email, first_name, last_name
#     Read-only fields: pk, email
#     Returns UserModel fields.
#     """
#     serializer_class = UserDetailsSerializer
#     permission_classes = (IsAuthenticated,)

#     def get_object(self):
#         return self.request.user

#     def get_queryset(self):
#         """
#         Adding this method since it is sometimes called when using
#         django-rest-swagger
#         https://github.com/Tivix/django-rest-auth/issues/275
#         """
#         return get_user_model().objects.none()
