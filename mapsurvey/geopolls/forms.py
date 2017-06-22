# from django.contrib.gis import forms
from django import forms
from leaflet.forms.widgets import LeafletWidget
from .models import Submission


class SubmissionForm(forms.ModelForm):
    class Meta:
        model = Submission
        fields = ('name', 'geom', 'description', 'org', 'email')
        widgets = {'geom': LeafletWidget()}

# class SubmitForm(forms.Form):
#     geom= forms.CharField()
#     name = forms.CharField()
#     description = forms.CharField(widget=forms.Textarea)
#     org = forms.CharField()
#     email = forms.CharField()
#
#     def send_email(self):
#         # send email using the self.cleaned_data dictionary
#         pass
