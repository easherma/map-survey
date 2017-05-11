from django.conf.urls import url, include
from rest_framework import routers
map_survey = __import__('map-survey')
# from map_survey.api import views

router = routers.DefaultRouter()
router.register(r'submissions', views.SubmissionViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
