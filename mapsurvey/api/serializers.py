from geopolls.models import Submission
from mapsurvey.users.models import User
from rest_framework import serializers
# from djgeojson.serializers import Serializer as GeoJSONSerializer
# from djgeojson.fields import PointField
from rest_framework_gis.serializers import GeoFeatureModelSerializer

class LocationSerializer(GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """

    class Meta:
        model = Submission
        geo_field = "geom"
        # you can also explicitly declare which fields you want to include
        # as with a ModelSerializer.
        fields = ('url','user_id_id', 'description', 'geom', 'org', 'email', 'name')

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
