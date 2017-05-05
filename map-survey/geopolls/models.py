from django.contrib.gis.db import models

# Create your models here.
class Submission(models.Model):
    user_id = models.ForeignKey('users.User')
    description = models.CharField('description', max_length=255)
    #geodjango geometry field
    the_geom= models.GeometryField()
