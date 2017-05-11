from django.db import models
from djgeojson.fields import GeometryField


# Create your models here.
class Submission(models.Model):
    user_id = models.ForeignKey('users.User', null = True,  blank=True)
    name = models.CharField(('Name of User'), blank=True, max_length=255)
    org = models.CharField(('Affiliated Organization'), blank=True, max_length=255)
    email = models.EmailField(('Email'), blank=True, max_length=255)
    description = models.CharField('description', max_length=255, null = True,  blank=True)
    #geodjango geometry field
    geom = GeometryField()
