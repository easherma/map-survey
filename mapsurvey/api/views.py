from django.shortcuts import render
from geopolls.models import Submission
from mapsurvey.users.models import User
from rest_framework import viewsets
from .serializers import SubmissionSerializer, UserSerializer

# Create your views here.
class SubmissionViewSet(viewsets.ModelViewSet):
    """
    API Endpoint for Submissions
    """
    queryset = Submission.objects.all()
    serializer_class= SubmissionSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
