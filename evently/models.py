# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User


class Event(models.Model):
    id = models.IntegerField(
        primary_key=True, null=False, unique=True, db_index=True)
    status = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    description = models.TextField()
    official = models.BooleanField()
    visibility = models.TextField()
    guests_can_invite_others = models.BooleanField()
    modified_date = models.DateTimeField()
    created_date = models.DateTimeField()
    participant_count = models.FloatField()
    reason_for_private = models.TextField()
    order_email_template = models.TextField()
    name = models.TextField()

    class Meta:
        managed = False
        db_table = 'events'

    def register(self, user=User.objects.get(pk=1)):
        if Registration.objects.filter(user=user, event=self):
            raise ValidationError('User already registered')
        Registration.objects.create(user=user, event=self)
        self.participant_count += 1
        self.save()
        return 'User registered'

    def unregister(self, user=User.objects.get(pk=1)):
        if not Registration.objects.filter(user=user, event=self):
            raise ValidationError('No registered user found')
        Registration.objects.get(user=user, event=self).delete()
        self.participant_count -= 1
        self.save()
        return 'User unregistered'

    def user_registered(self, user=User.objects.get(pk=1)):
        return bool(self.registration_set.filter(user=user))


class Location(models.Model):
    id = models.IntegerField(
        primary_key=True, null=False, unique=True, db_index=True)
    event = models.OneToOneField('Event', on_delete=models.CASCADE)
    contact_phone = models.TextField()
    primary = models.BooleanField()
    contact_email = models.TextField()
    contact_family_name = models.TextField()
    contact_given_name = models.TextField()
    host_given_name = models.TextField()
    timezone = models.TextField()
    city = models.TextField()
    locality = models.TextField()
    state = models.TextField()
    address_type = models.TextField()
    latitude = models.TextField()
    longitude = models.TextField()
    accuracy = models.TextField()
    address1 = models.TextField()
    address2 = models.TextField()
    postal_code = models.TextField()
    country = models.TextField()
    modified_date = models.DateTimeField()
    created_date = models.DateTimeField()
    number_spaces_remaining = models.FloatField(null=True, blank=True)
    spaces_remaining = models.BooleanField()
    name = models.TextField()

    class Meta:
        managed = False
        db_table = 'locations'


class Registration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
