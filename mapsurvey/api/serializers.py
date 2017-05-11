from geopolls.models import Submission
from mapsurvey.users.models import User
from rest_framework import serializers

class SubmissionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Submission
        fields = ('url','user_id_id', 'description', 'geom', 'org', 'email', 'name')



class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'groups')
