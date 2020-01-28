from celery import shared_task

from django.core.mail import send_mail

@shared_task
def send_email_verification():
  send_mail(
    'Bienvenido al SGI! Confirma tu email para continuar.',
    '''
     Usted a recibido este mensaje porque se ha utilizado 
     su mail como metodo de autenticacion en nuestra plataforma.
     
     Para continuar por favor active su cuenta con el siguiente 
     link: 
    
     Si usted no ha realizado el registro por favor ignore este mail.

     Saludos cordiales equipo IT del SGI.
    ''',
    'ithosting2019@gmail.com',
    ['payilid147@imailt.com'],
    fail_silently=False,
  )
