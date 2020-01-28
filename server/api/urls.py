from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.urls import path, re_path, include

from allauth.account.views import ConfirmEmailView
from rest_auth.registration.views import VerifyEmailView, RegisterView

from .views import (
    null_view,
    complete_view
)

urlpatterns = [
    re_path(r'^auth/registration/account-email-verification-sent/', null_view, name='account_email_verification_sent'),
    re_path(r'^auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$', ConfirmEmailView.as_view(), name='account_confirm_email'),
    re_path(r'^auth/registration/complete/$', complete_view, name='account_confirm_complete'),
    re_path(r'^auth/password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', null_view, name='password_reset_confirm'),

    path('api-auth/', include('rest_framework.urls')),
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('', include('events.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
