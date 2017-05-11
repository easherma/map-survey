from django.conf.urls import url, include
from rest_framework import routers
from api import views
from djgeojson.views import GeoJSONLayerView
from geopolls.models import Submission

router = routers.DefaultRouter()
router.register(r'submissions', views.SubmissionViewSet)
router.register(r'user', views.UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^data', GeoJSONLayerView.as_view(model=Submission), name='data'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
