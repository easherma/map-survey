from django.db import models
from djgeojson.fields import GeometryField

# Create your models here.
class Submission(models.Model):
    user_id = models.ForeignKey('users.User')
    description = models.CharField('description', max_length=255)
    #geodjango geometry field
    geom= GeometryField()
