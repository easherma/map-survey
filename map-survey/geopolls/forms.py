from django import forms

class SubmitForm(forms.Form):
    geom= forms.CharField()
    name = forms.CharField()
    description = forms.CharField(widget=forms.Textarea)
    org = forms.CharField()
    email = forms.CharField()

    def send_email(self):
        # send email using the self.cleaned_data dictionary
        pass
