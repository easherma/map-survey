from geopolls.models import Submission
from django.contrib.auth.models import User, Group
from rest_framework import serializers

class SubmissionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Submission
        lookup_field='user_id'
        fields = ('url','user_id', 'description', 'geom', 'org', 'email')


# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = ('url', 'username', 'email', 'groups')
