from geopolls.models import Submission
from mapsurvey.users.models import User
from rest_framework import serializers
from djgeojson.serializers import Serializer as GeoJSONSerializer
from djgeojson.fields import PointField

class SubmissionSerializer(serializers.HyperlinkedModelSerializer):
    # submissions = serializers.HyperlinkedRelatedField(many=True, view_name='submission-detail', queryset = Submission.objects.all(), allow_null=True, required=False)
    # owner = serializers.HyperlinkedRelatedField(view_name='user-detail', queryset = User.objects.all(), allow_null=True, required=False)
    class Meta:
        model = Submission
        fields = ('url','user_id_id', 'description', 'geom', 'org', 'email', 'name')



class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'groups')
