from django.contrib.gis.db import models
# from djgeojson.fields import GeometryField



# Create your models here.
class Submission(models.Model):
    user_id = models.ForeignKey('users.User', null = True,  blank=True)
    name = models.CharField(('Name of User'), blank=True, max_length=2555)
    org = models.CharField(('Affiliated Organization'), blank=True, max_length=2555)
    email = models.EmailField(('Email'), blank=True, max_length=2555)
    description = models.CharField('description', max_length=2555, null = True,  blank=True)
    #geodjango geometry field
    geom = models.GeometryField()
#
# class ReviewSubmissions(Submission):
#     class Meta:
#         proxy=True
