from django.shortcuts import render
from geopolls.models import Submission
from rest_framework import viewsets
from .serializers import SubmissionSerializer

# Create your views here.
class SubmissionViewSet(viewsets.ModelViewSet):
    """
    API Endpoint for Submissions
    """
    queryset = Submission.objects.all()
    serializer_class= SubmissionSerializer
