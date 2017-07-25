from django.contrib.gis import admin

# Register your models here.
from leaflet.admin import LeafletGeoAdmin
from leaflet.admin import LeafletGeoAdminMixin

from .models import Submission

# admin.site.register(Submission, admin.OSMGeoAdmin)

class SubmissionAdmin(LeafletGeoAdmin):
    list_display = ('name', 'org', 'email', 'description')

admin.site.register(Submission, SubmissionAdmin)
