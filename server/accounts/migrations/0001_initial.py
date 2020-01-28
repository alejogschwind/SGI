# Generated by Django 2.2.7 on 2020-01-07 16:09

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('type', models.CharField(choices=[('RDR', 'Representante Distrital Rotaract'), ('PCR', 'Presidente Club Rotaract'), ('SCR', 'Socio Club Rotaract')], default='SCR', max_length=3)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='EmergencyContact',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='emergency_contact', serialize=False, to=settings.AUTH_USER_MODEL, verbose_name='user')),
                ('first_name', models.CharField(max_length=40, null=True)),
                ('last_name', models.CharField(max_length=40, null=True)),
                ('relationship', models.CharField(max_length=20, null=True)),
                ('prefix', models.CharField(max_length=4, null=True)),
                ('phone_number', models.CharField(max_length=20, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Institutional',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='institutional', serialize=False, to=settings.AUTH_USER_MODEL, verbose_name='user')),
                ('weel', models.CharField(max_length=20, null=True)),
                ('airaup_commission', models.CharField(max_length=20, null=True)),
                ('airaup_position', models.CharField(max_length=20, null=True)),
                ('club', models.CharField(max_length=40, null=True)),
                ('club_position', models.CharField(max_length=20, null=True)),
                ('district', models.CharField(max_length=6, null=True)),
                ('district_position', models.CharField(max_length=20, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='MedicalRecord',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='medical_record', serialize=False, to=settings.AUTH_USER_MODEL, verbose_name='user')),
                ('health_insurance', models.CharField(max_length=30, null=True)),
                ('affiliate_number', models.CharField(max_length=30, null=True)),
                ('blood_type', models.CharField(max_length=3, null=True)),
                ('have_allergy', models.BooleanField(null=True)),
                ('have_medication', models.BooleanField(null=True)),
                ('have_periodic_treatment', models.BooleanField(null=True)),
                ('have_physical_limitation', models.BooleanField(null=True)),
                ('have_special_diet', models.BooleanField(null=True)),
                ('have_surgeries', models.BooleanField(null=True)),
                ('have_additional', models.BooleanField(null=True)),
                ('allergy_obs', models.CharField(blank=True, max_length=80, null=True)),
                ('diet_obs', models.CharField(blank=True, max_length=80, null=True)),
                ('medication_obs', models.CharField(blank=True, max_length=80, null=True)),
                ('treatment_obs', models.CharField(blank=True, max_length=80, null=True)),
                ('limitation_obs', models.CharField(blank=True, max_length=80, null=True)),
                ('surgeries_obs', models.CharField(blank=True, max_length=80, null=True)),
                ('additional_obs', models.CharField(blank=True, max_length=80, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Personal',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='personal', serialize=False, to=settings.AUTH_USER_MODEL, verbose_name='user')),
                ('first_name', models.CharField(max_length=40, null=True)),
                ('last_name', models.CharField(max_length=40, null=True)),
                ('gender', models.CharField(max_length=1, null=True)),
                ('birthdate', models.DateField(null=True)),
                ('passport', models.CharField(max_length=12, null=True)),
                ('prefix', models.CharField(max_length=4, null=True)),
                ('phone_number', models.CharField(max_length=20, null=True)),
                ('job', models.CharField(max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='profile', serialize=False, to=settings.AUTH_USER_MODEL, verbose_name='user')),
                ('bio', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='address', to=settings.AUTH_USER_MODEL, verbose_name='user')),
            ],
        ),
    ]