from django.conf.urls import url
from geopolls.views import SubmissionCreate
from djgeojson.views import GeoJSONLayerView
from .models import Submission

urlpatterns = [
    # ...
    # url(r'submission/add/$', SubmissionCreate, name='submission-add'),
    # url(r'^submission/data/$', GeoJSONLayerView.as_view(model=Submission), name='data')
    # url(r'author/(?P<pk>[0-9]+)/$', AuthorUpdate.as_view(), name='author-update'),
    # url(r'author/(?P<pk>[0-9]+)/delete/$', AuthorDelete.as_view(), name='author-delete'),
]
# url(r'^(?P<question_id>[0-9]+)/vote/$', views.vote, name='vote'),
