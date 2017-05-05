from django.contrib import admin

# Register your models here.
from leaflet.admin import LeafletGeoAdmin

from .models import Submission


admin.site.register(Submission, LeafletGeoAdmin)