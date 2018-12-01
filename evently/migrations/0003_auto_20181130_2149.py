# Generated by Django 2.1.3 on 2018-11-30 21:49

from django.db import migrations
from django.contrib.auth.admin import User


def create_superuser(apps, schema_editor):
    superuser = User(is_active=True, is_superuser=True,
                     is_staff=True, username="test")
    superuser.set_password('test123')
    superuser.save()


class Migration(migrations.Migration):

    dependencies = [
        ('evently', '0002_auto_20181130_2127'),
    ]

    operations = [
        migrations.RunPython(create_superuser)
    ]